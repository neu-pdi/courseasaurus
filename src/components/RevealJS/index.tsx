import React, { useEffect, useRef, ReactNode, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';
import 'reveal.js/dist/theme/black.css';
import 'reveal.js/dist/theme/league.css';
import 'reveal.js/dist/theme/beige.css';
import 'reveal.js/dist/theme/sky.css';
import 'reveal.js/dist/theme/night.css';
import 'reveal.js/dist/theme/serif.css';
import 'reveal.js/dist/theme/simple.css';
import 'reveal.js/dist/theme/solarized.css';
import 'reveal.js/dist/theme/blood.css';
import 'reveal.js/dist/theme/moon.css';
import { useColorMode } from '../ui/color-mode';
import styles from './styles.module.css';

interface RevealJSProps {
  children?: ReactNode;
  htmlContent?: string;
  theme?: string;
  transition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
  controls?: boolean;
  progress?: boolean;
  center?: boolean;
  touch?: boolean;
  loop?: boolean;
  keyboard?: boolean;
  overview?: boolean;
  hash?: boolean;
  autoSlides?: boolean; // Auto-split markdown into slides
  slideSeparator?: string; // Separator for slides (default: '---')
}

export default function RevealJS({ 
  children,
  htmlContent,
  theme: themeProp,
  transition = 'slide',
  controls = true,
  progress = true,
  center = true,
  touch = true,
  loop = false,
  keyboard = true,
  overview = true,
  hash = true,
  autoSlides = false,
  slideSeparator = '---',
}: RevealJSProps) {
  const { colorMode } = useColorMode();
  
  // Sync RevealJS theme with Docusaurus color mode
  // Dark mode -> "black" theme, Light mode -> "white" theme
  // Allow theme prop to override if explicitly provided
  // Default to 'white' if colorMode is not yet available (during SSR/hydration)
  const theme = useMemo(() => {
    if (themeProp) return themeProp;
    if (!colorMode) return 'white'; // Default during SSR/hydration
    return colorMode === 'dark' ? 'black' : 'white';
  }, [themeProp, colorMode]);
  
  const revealRef = useRef<HTMLDivElement>(null);
  const fullscreenRevealRef = useRef<HTMLDivElement>(null);
  const revealInstanceRef = useRef<Reveal.Api | null>(null);
  const fullscreenRevealInstanceRef = useRef<Reveal.Api | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const resizeHandlerRef = useRef<(() => void) | null>(null);
  const fullscreenResizeObserverRef = useRef<ResizeObserver | null>(null);
  const fullscreenResizeHandlerRef = useRef<(() => void) | null>(null);
  const isUpdatingViewportRef = useRef<boolean>(false);
  const lastViewportSizeRef = useRef<{ width: number; height: number } | null>(null);

  // Create portal container for fullscreen mode
  useEffect(() => {
    if (isFullscreen && typeof document !== 'undefined') {
      const container = document.createElement('div');
      container.id = 'reveal-fullscreen-portal';
      document.body.appendChild(container);
      setPortalContainer(container);

      return () => {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
        setPortalContainer(null);
      };
    }
  }, [isFullscreen]);

  // Handle fullscreen mode - hide Docusaurus UI
  useEffect(() => {
    const rootElement = document.documentElement;
    const bodyElement = document.body;
    
    if (isFullscreen) {
      rootElement.classList.add('reveal-fullscreen');
      bodyElement.classList.add('reveal-fullscreen');
    } else {
      rootElement.classList.remove('reveal-fullscreen');
      bodyElement.classList.remove('reveal-fullscreen');
    }

    return () => {
      rootElement.classList.remove('reveal-fullscreen');
      bodyElement.classList.remove('reveal-fullscreen');
    };
  }, [isFullscreen]);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  // Preprocess Mermaid code to fix curly braces in node labels
  const preprocessMermaidCode = (code: string): string => {
    // Fix curly braces inside node labels by wrapping them in quotes
    // Pattern: matches node labels like E[Memory: {5}] and wraps them in quotes
    // This handles cases where curly braces inside square brackets cause parsing errors
    return code.replace(/(\w+)\[([^\]]*\{[^\}]*\}[^\]]*)\]/g, (match, nodeId, label) => {
      // If label already has quotes, don't modify
      if ((label.startsWith('"') && label.endsWith('"')) || 
          (label.startsWith("'") && label.endsWith("'"))) {
        return match;
      }
      // Wrap label in double quotes to escape curly braces
      return `${nodeId}["${label}"]`;
    });
  };

  // Initialize Mermaid diagrams with theme support
  const initializeMermaid = (container: HTMLDivElement | null, forceReinit = false, revealInstance: Reveal.Api | null = null) => {
    if (!container || typeof window === 'undefined') return;
    
    // Determine Mermaid theme based on RevealJS theme
    const mermaidTheme = theme === 'black' ? 'dark' : 'default';
    
    // Try to use Docusaurus Mermaid initialization if available
    if ((window as any).mermaid) {
      const mermaid = (window as any).mermaid;
      
      // Set global theme if mermaid.initialize is available
      if (mermaid.initialize) {
        try {
          mermaid.initialize({ 
            theme: mermaidTheme,
            themeVariables: mermaidTheme === 'dark' ? {
              primaryColor: '#4a5568',
              primaryTextColor: '#e2e8f0',
              primaryBorderColor: '#718096',
              lineColor: '#cbd5e0',
              secondaryColor: '#2d3748',
              tertiaryColor: '#1a202c',
            } : {
              primaryColor: '#e8e8ff',
              primaryTextColor: '#1a1a1a',
              primaryBorderColor: '#9370DB',
              lineColor: '#333',
              secondaryColor: '#f0f0f0',
              tertiaryColor: '#ffffff',
            }
          });
        } catch (e) {
          console.warn('Mermaid theme initialization error:', e);
        }
      }
      
      const mermaidElements = container.querySelectorAll('.mermaid');
      let hasUninitialized = false;
      
      mermaidElements.forEach((element) => {
        // Preprocess Mermaid code to fix curly braces in node labels
        const originalText = element.textContent || '';
        if (originalText && originalText.includes('{') && originalText.includes('[')) {
          const processedText = preprocessMermaidCode(originalText);
          if (processedText !== originalText) {
            element.textContent = processedText;
          }
        }
        
        // If forcing reinit, remove data-processed attribute and clear content
        if (forceReinit && element.hasAttribute('data-processed')) {
          element.removeAttribute('data-processed');
          // Clear the SVG content to force re-render
          const svg = element.querySelector('svg');
          if (svg) {
            svg.remove();
          }
        }
        
        // Check if already initialized
        if (!element.hasAttribute('data-processed')) {
          hasUninitialized = true;
          try {
            mermaid.init(undefined, element);
          } catch (e) {
            console.warn('Mermaid initialization error:', e);
          }
        }
      });
      
      // If we initialized any diagrams, wait for them to render and then recalculate layout
      if (hasUninitialized && revealInstance) {
        // Wait for Mermaid to render (it's async)
        setTimeout(() => {
          if (revealInstance && typeof revealInstance.layout === 'function') {
            revealInstance.layout();
          }
        }, 200);
      }
    } else {
      // Fallback: trigger Docusaurus Mermaid initialization
      // Docusaurus theme-mermaid listens for DOMContentLoaded and processes .mermaid elements
      // We can trigger a custom event or manually process
      const mermaidElements = container.querySelectorAll('.mermaid');
      if (mermaidElements.length > 0) {
        // Dispatch a custom event that might trigger Mermaid processing
        const event = new Event('mermaid-init', { bubbles: true });
        container.dispatchEvent(event);
        
        // Also recalculate layout after a delay
        if (revealInstance) {
          setTimeout(() => {
            if (revealInstance && typeof revealInstance.layout === 'function') {
              revealInstance.layout();
            }
          }, 300);
        }
      }
    }
  };

  // Fix viewport sizing to match container - CRITICAL for proper RevealJS scaling
  const fixViewportSize = (container: HTMLElement, revealInstance: Reveal.Api, context = 'normal', force = false) => {
    // Prevent infinite loops
    if (isUpdatingViewportRef.current && !force) {
      return;
    }

    if (!container || !revealInstance) {
      return;
    }

    // RevealJS creates .reveal-viewport as a wrapper around the .reveal element
    // Find it by traversing up from container or finding the one that contains it
    let viewport: HTMLElement | null = container.closest('.reveal-viewport') as HTMLElement;
    
    // If not found as parent, find any viewport that contains this container
    if (!viewport) {
      const allViewports = document.querySelectorAll('.reveal-viewport');
      for (const vp of Array.from(allViewports)) {
        if (vp.contains(container)) {
          viewport = vp as HTMLElement;
          break;
        }
      }
    }
    
    // Last resort: find any viewport (shouldn't happen, but handle gracefully)
    if (!viewport) {
      viewport = document.querySelector('.reveal-viewport') as HTMLElement;
    }
    
    if (!viewport) {
      // Viewport not created yet - retry after a short delay
      setTimeout(() => fixViewportSize(container, revealInstance, context, force), 50);
      return;
    }

    // Get the actual container dimensions (what we want the viewport to be)
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    // Only proceed if we have valid dimensions
    if (containerWidth <= 0 || containerHeight <= 0) {
      return;
    }

    // Check if dimensions actually changed (avoid unnecessary updates)
    const currentSize = { width: containerWidth, height: containerHeight };
    const lastSize = lastViewportSizeRef.current;
    
    if (!force && lastSize && 
        Math.abs(lastSize.width - currentSize.width) < 1 && 
        Math.abs(lastSize.height - currentSize.height) < 1) {
      return;
    }

    // Set updating flag to prevent loops
    isUpdatingViewportRef.current = true;
    lastViewportSizeRef.current = currentSize;

    // CRITICAL: Set viewport to EXACT container dimensions
    // RevealJS uses viewport size to calculate slide scaling
    viewport.style.width = `${containerWidth}px`;
    viewport.style.height = `${containerHeight}px`;
    viewport.style.maxWidth = `${containerWidth}px`;
    viewport.style.maxHeight = `${containerHeight}px`;
    viewport.style.boxSizing = 'border-box';
    viewport.style.position = 'relative';
    viewport.style.overflow = 'hidden'; // CRITICAL: Clip overflowing slides
    
    // Also ensure the .reveal element inside viewport is properly constrained
    const revealElement = viewport.querySelector('.reveal') as HTMLElement;
    if (revealElement) {
      revealElement.style.width = '100%';
      revealElement.style.height = '100%';
      revealElement.style.maxWidth = '100%';
      revealElement.style.maxHeight = '100%';
    }

    // CRITICAL: Force RevealJS to recalculate layout with new viewport size
    // Use requestAnimationFrame to ensure DOM has updated before layout()
    requestAnimationFrame(() => {
      // Call layout() to recalculate slide scaling based on new viewport size
      if (typeof revealInstance.layout === 'function') {
        revealInstance.layout();
      }
      
      // After layout(), RevealJS applies CSS transforms to scale slides
      // Give it a moment to apply transforms, then verify scaling
      requestAnimationFrame(() => {
        // Ensure slides are scaled and clipped
        const revealElement = viewport.querySelector('.reveal') as HTMLElement;
        if (revealElement) {
          // RevealJS should have applied transform: scale() to fit viewport
          // Ensure it's constrained
          revealElement.style.maxWidth = '100%';
          revealElement.style.maxHeight = '100%';
        }
        
        // Clear updating flag after layout completes
        setTimeout(() => {
          isUpdatingViewportRef.current = false;
        }, 50);
      });
    });
  };

  // Sync RevealJS slide changes with Docusaurus TOC
  const syncTOCWithSlide = (revealInstance: Reveal.Api) => {
    const currentSlide = revealInstance.getCurrentSlide();
    if (!currentSlide) return;

    // Find the heading in the current slide (prefer h2, then h1, then others)
    const heading = currentSlide.querySelector('h2') || 
                    currentSlide.querySelector('h1') || 
                    currentSlide.querySelector('h3, h4, h5, h6');
    if (!heading) return;

    const headingText = heading.textContent?.trim();
    if (!headingText) return;

    // Try multiple TOC selectors (Docusaurus may use different class names)
    const tocSelectors = [
      '.table-of-contents a',
      '.theme-doc-toc-desktop a',
      '.toc a',
      '[class*="toc"] a'
    ];

    let tocLinks: NodeListOf<Element> | null = null;
    for (const selector of tocSelectors) {
      tocLinks = document.querySelectorAll(selector);
      if (tocLinks.length > 0) break;
    }

    if (!tocLinks || tocLinks.length === 0) return;

    // Remove active class from all TOC items
    tocLinks.forEach(link => {
      link.classList.remove('table-of-contents__link--active');
      // Also try other possible active class names
      link.classList.remove('active');
      link.setAttribute('aria-current', 'false');
    });

    // Find and highlight the matching TOC item
    tocLinks.forEach(link => {
      const linkText = link.textContent?.trim();
      // Match by exact text or by checking if the link text contains the heading
      if (linkText === headingText || linkText.includes(headingText) || headingText.includes(linkText)) {
        link.classList.add('table-of-contents__link--active');
        link.setAttribute('aria-current', 'page');
        // Scroll TOC item into view if needed
        link.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  };

  // Initialize Reveal.js for normal mode
  useEffect(() => {
    if (!revealRef.current || isFullscreen) return;

    // Destroy fullscreen instance if it exists
    if (fullscreenRevealInstanceRef.current) {
      fullscreenRevealInstanceRef.current.destroy();
      fullscreenRevealInstanceRef.current = null;
    }

    // Wait for slides to be rendered
    const timer = setTimeout(() => {
      if (!revealRef.current || isFullscreen) return;

      // Initialize Reveal.js
      const reveal = new Reveal(revealRef.current, {
        hash,
        controls,
        progress,
        center,
        touch,
        loop,
        keyboard,
        overview,
        transition: transition as any,
        theme: theme as any,
      } as any);

      reveal.initialize({embedded: true}).then(() => {
        revealInstanceRef.current = reveal;
        
        // CRITICAL: Fix viewport sizing to match container
        // RevealJS creates the viewport during initialization, so wait for it
        if (revealRef.current) {
          // Use multiple attempts to ensure viewport is found and sized correctly
          const attemptFix = (attempt = 0) => {
            const viewport = revealRef.current?.closest('.reveal-viewport') || 
                           document.querySelector('.reveal-viewport');
            if (viewport || attempt >= 10) {
              // Viewport found or max attempts reached
              // Force fix with layout recalculation
              fixViewportSize(revealRef.current!, reveal, 'normal-init', attempt === 0);
              
              // After fixing, call layout() again to ensure scaling is recalculated
              if (viewport && attempt < 10) {
                setTimeout(() => {
                  if (typeof reveal.layout === 'function') {
                    reveal.layout();
                  }
                }, 100);
              }
            } else {
              // Retry after short delay
              setTimeout(() => attemptFix(attempt + 1), 50);
            }
          };
          
          // Start fixing viewport after initialization
          setTimeout(() => attemptFix(), 50);
        }
        
        // Ensure viewport gets correct background based on theme
        // Reveal.js creates .reveal-viewport as a sibling/ancestor, find it via document
        const viewport = document.querySelector('.reveal-viewport') as HTMLElement;
        if (viewport) {
          if (theme === 'white') {
            viewport.style.backgroundColor = '#fff';
            viewport.classList.add('has-white');
            viewport.classList.remove('has-black');
          } else if (theme === 'black') {
            viewport.style.backgroundColor = '#191919';
            viewport.classList.add('has-black');
            viewport.classList.remove('has-white');
          }
        }
        
        // Initialize Mermaid diagrams after RevealJS is ready
        initializeMermaid(revealRef.current, false, reveal);
        
        // Sync TOC on initial load
        syncTOCWithSlide(reveal);
        
        // Sync TOC when slide changes
        reveal.on('slidechanged', () => {
          syncTOCWithSlide(reveal);
          // Re-initialize Mermaid when slide changes (in case new diagrams appear)
          initializeMermaid(revealRef.current, false, reveal);
        });

        // Set up ResizeObserver to handle container resizing
        if (revealRef.current && typeof ResizeObserver !== 'undefined') {
          // Clean up any existing observer
          if (resizeObserverRef.current) {
            resizeObserverRef.current.disconnect();
          }
          if (resizeHandlerRef.current) {
            window.removeEventListener('resize', resizeHandlerRef.current);
          }
          
          resizeObserverRef.current = new ResizeObserver((entries) => {
            // Prevent infinite loops
            if (isUpdatingViewportRef.current) {
              return;
            }
            
            if (revealInstanceRef.current && revealRef.current) {
              const containerRect = revealRef.current.getBoundingClientRect();
              const currentSize = { width: containerRect.width, height: containerRect.height };
              const lastSize = lastViewportSizeRef.current;
              
              // Only update if size actually changed
              if (!lastSize || 
                  Math.abs(lastSize.width - currentSize.width) >= 1 || 
                  Math.abs(lastSize.height - currentSize.height) >= 1) {
                // CRITICAL: Fix viewport size and recalculate layout on resize
                fixViewportSize(revealRef.current, revealInstanceRef.current, 'normal-resize');
              }
            }
          });
          resizeObserverRef.current.observe(revealRef.current);
          
          // Also observe window resize as fallback (debounced)
          let resizeTimeout: NodeJS.Timeout | null = null;
          resizeHandlerRef.current = () => {
            // Debounce window resize events
            if (resizeTimeout) {
              clearTimeout(resizeTimeout);
            }
            
            resizeTimeout = setTimeout(() => {
              // Prevent infinite loops
              if (isUpdatingViewportRef.current) {
                return;
              }
              
              if (revealInstanceRef.current && revealRef.current) {
                const containerRect = revealRef.current.getBoundingClientRect();
                const currentSize = { width: containerRect.width, height: containerRect.height };
                const lastSize = lastViewportSizeRef.current;
                
                // Only update if size actually changed
                if (!lastSize || 
                    Math.abs(lastSize.width - currentSize.width) >= 1 || 
                    Math.abs(lastSize.height - currentSize.height) >= 1) {
                  // CRITICAL: Fix viewport size and recalculate layout on window resize
                  fixViewportSize(revealRef.current, revealInstanceRef.current, 'normal-window-resize');
                }
              }
            }, 100); // Debounce by 100ms
          };
          window.addEventListener('resize', resizeHandlerRef.current);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      if (resizeHandlerRef.current) {
        window.removeEventListener('resize', resizeHandlerRef.current);
        resizeHandlerRef.current = null;
      }
      if (revealInstanceRef.current && !isFullscreen) {
        revealInstanceRef.current.destroy();
        revealInstanceRef.current = null;
      }
      // Reset flags on cleanup
      isUpdatingViewportRef.current = false;
      lastViewportSizeRef.current = null;
    };
  }, [theme, transition, controls, progress, center, touch, loop, keyboard, overview, hash, htmlContent, isFullscreen]);

  // Fix viewport sizing when transitioning to/from fullscreen
  useEffect(() => {
    if (!isFullscreen) {
      return;
    }
    
    // When entering fullscreen, fix viewport sizing after a short delay
    // This ensures the viewport matches the fullscreen container
    const timer = setTimeout(() => {
      if (fullscreenRevealInstanceRef.current && fullscreenRevealRef.current && isFullscreen) {
        // Use fixViewportSize to ensure proper sizing and layout recalculation
        fixViewportSize(fullscreenRevealRef.current, fullscreenRevealInstanceRef.current, 'fullscreen-transition', true);
      }
    }, 200);
    
    return () => {
      clearTimeout(timer);
    };
  }, [isFullscreen]);

  // Update viewport background when theme changes (for immediate visual feedback)
  useEffect(() => {
    const viewport = document.querySelector('.reveal-viewport') as HTMLElement;
    if (viewport) {
      if (theme === 'white') {
        viewport.style.backgroundColor = '#fff';
        viewport.classList.add('has-white');
        viewport.classList.remove('has-black');
      } else if (theme === 'black') {
        viewport.style.backgroundColor = '#191919';
        viewport.classList.add('has-black');
        viewport.classList.remove('has-white');
      }
    }
  }, [theme]);

  // Re-initialize Mermaid diagrams when theme changes
  useEffect(() => {
    // Wait a bit for theme to be applied
    const timer = setTimeout(() => {
      if (revealRef.current && !isFullscreen && revealInstanceRef.current) {
        initializeMermaid(revealRef.current, true, revealInstanceRef.current);
      }
      if (fullscreenRevealRef.current && isFullscreen && fullscreenRevealInstanceRef.current) {
        initializeMermaid(fullscreenRevealRef.current, true, fullscreenRevealInstanceRef.current);
      }
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, isFullscreen]);

  // Initialize Reveal.js for fullscreen mode
  useEffect(() => {
    if (!fullscreenRevealRef.current || !isFullscreen || !portalContainer) return;

    // Destroy normal instance if it exists
    if (revealInstanceRef.current) {
      revealInstanceRef.current.destroy();
      revealInstanceRef.current = null;
    }

    // Wait for slides to be rendered
    const timer = setTimeout(() => {
      if (!fullscreenRevealRef.current || !isFullscreen) return;

      // Initialize Reveal.js
      const reveal = new Reveal(fullscreenRevealRef.current, {
        hash,
        controls,
        progress,
        center,
        touch,
        loop,
        keyboard,
        overview,
        transition: transition as any,
        theme: theme as any,
      } as any);

      reveal.initialize({embedded: true}).then(() => {
        fullscreenRevealInstanceRef.current = reveal;
        
        // CRITICAL: Fix viewport sizing to match fullscreen container
        // RevealJS creates the viewport during initialization, so wait for it
        if (fullscreenRevealRef.current) {
          // Use multiple attempts to ensure viewport is found and sized correctly
          const attemptFix = (attempt = 0) => {
            const viewport = fullscreenRevealRef.current?.closest('.reveal-viewport') || 
                           document.querySelector('.reveal-viewport');
            if (viewport || attempt >= 5) {
              // Viewport found or max attempts reached
              fixViewportSize(fullscreenRevealRef.current!, reveal, 'fullscreen-init', attempt === 0);
            } else {
              // Retry after short delay
              setTimeout(() => attemptFix(attempt + 1), 50);
            }
          };
          
          // Start fixing viewport after initialization
          setTimeout(() => attemptFix(), 50);
        }
        
        // Ensure viewport gets correct background based on theme
        // Reveal.js creates .reveal-viewport as a sibling/ancestor, find it via document
        const viewport = document.querySelector('.reveal-viewport') as HTMLElement;
        if (viewport) {
          if (theme === 'white') {
            viewport.style.backgroundColor = '#fff';
            viewport.classList.add('has-white');
            viewport.classList.remove('has-black');
          } else if (theme === 'black') {
            viewport.style.backgroundColor = '#191919';
            viewport.classList.add('has-black');
            viewport.classList.remove('has-white');
          }
        }
        
        // Initialize Mermaid diagrams after RevealJS is ready
        initializeMermaid(fullscreenRevealRef.current, false, reveal);
        
        // Sync TOC on initial load (if TOC is still accessible)
        syncTOCWithSlide(reveal);
        
        // Sync TOC when slide changes
        reveal.on('slidechanged', () => {
          syncTOCWithSlide(reveal);
          // Re-initialize Mermaid when slide changes
          initializeMermaid(fullscreenRevealRef.current, false, reveal);
        });

        // Set up ResizeObserver for fullscreen mode
        if (fullscreenRevealRef.current && typeof ResizeObserver !== 'undefined') {
          // Clean up any existing observer
          if (fullscreenResizeObserverRef.current) {
            fullscreenResizeObserverRef.current.disconnect();
          }
          if (fullscreenResizeHandlerRef.current) {
            window.removeEventListener('resize', fullscreenResizeHandlerRef.current);
          }
          
          // Don't observe the container directly - it triggers on layout() calls
          // Instead, only use window resize handler which is debounced
          // The ResizeObserver was causing infinite loops because layout() changes container size
          console.log(`[RevealJS] Skipping container ResizeObserver for fullscreen (using window resize only)`);
          
          // Also observe window resize for fullscreen (debounced)
          let resizeTimeout: NodeJS.Timeout | null = null;
          fullscreenResizeHandlerRef.current = () => {
            // Debounce window resize events
            if (resizeTimeout) {
              clearTimeout(resizeTimeout);
            }
            
            resizeTimeout = setTimeout(() => {
              // Prevent infinite loops
              if (isUpdatingViewportRef.current) {
                return;
              }
              
              if (fullscreenRevealInstanceRef.current && fullscreenRevealRef.current && isFullscreen) {
                // CRITICAL: Fix viewport size and recalculate layout on window resize
                // In fullscreen, container should match window dimensions
                fixViewportSize(fullscreenRevealRef.current, fullscreenRevealInstanceRef.current, 'fullscreen-window-resize');
              }
            }, 100); // Debounce by 100ms
          };
          window.addEventListener('resize', fullscreenResizeHandlerRef.current);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (fullscreenResizeObserverRef.current) {
        fullscreenResizeObserverRef.current.disconnect();
        fullscreenResizeObserverRef.current = null;
      }
      if (fullscreenResizeHandlerRef.current) {
        window.removeEventListener('resize', fullscreenResizeHandlerRef.current);
        fullscreenResizeHandlerRef.current = null;
      }
      if (fullscreenRevealInstanceRef.current && isFullscreen) {
        fullscreenRevealInstanceRef.current.destroy();
        fullscreenRevealInstanceRef.current = null;
      }
      // Reset flags on cleanup
      isUpdatingViewportRef.current = false;
      lastViewportSizeRef.current = null;
    };
  }, [theme, transition, controls, progress, center, touch, loop, keyboard, overview, hash, htmlContent, isFullscreen, portalContainer]);

  const toggleFullscreen = () => {
    const newFullscreenState = !isFullscreen;
    console.log(`[RevealJS] toggleFullscreen: ${isFullscreen} -> ${newFullscreenState}`, {
      hasNormalInstance: !!revealInstanceRef.current,
      hasFullscreenInstance: !!fullscreenRevealInstanceRef.current,
      windowSize: { width: window.innerWidth, height: window.innerHeight },
    });
    setIsFullscreen(newFullscreenState);
  };

  // Check if children already contain Slide components
  const hasSlideComponents = useMemo(() => {
    if (!children || typeof children !== 'object') return false;
    
    const checkForSlides = (node: ReactNode): boolean => {
      if (!node) return false;
      if (typeof node === 'string' || typeof node === 'number') return false;
      if (Array.isArray(node)) {
        return node.some(checkForSlides);
      }
        if (React.isValidElement(node)) {
          // Check if it's a Slide component (check displayName or type)
          const componentName = (node.type as any)?.displayName || (node.type as any)?.name || '';
          if (componentName === 'Slide' || componentName === 'VerticalSlide') {
            return true;
          }
          // Check children recursively
          const props = node.props as { children?: ReactNode };
          if (props?.children) {
            return checkForSlides(props.children);
          }
        }
      return false;
    };
    
    return checkForSlides(children);
  }, [children]);

  // Auto-split markdown content into slides
  const processedChildren = useMemo(() => {
    // If autoSlides is false, return as-is
    if (!autoSlides || !children) {
      return children;
    }

    // Process React children and split by horizontal rules (<hr>) or h1/h2 headings
    // Handle mixed content: some slides may use <Slide> components, others use --- separators
    const splitIntoSlides = (nodes: ReactNode): { slides: ReactNode[], hasSplits: boolean } => {
      if (!nodes) return { slides: [], hasSplits: false };
      
      const slides: ReactNode[] = [];
      let currentSlide: ReactNode[] = [];
      let foundSplitter = false;
      
      const processNode = (node: ReactNode): void => {
        if (!node) return;
        
        if (Array.isArray(node)) {
          node.forEach(processNode);
          return;
        }
        
        if (React.isValidElement(node)) {
          // Check if it's a Slide component - treat it as a complete slide
          const componentName = (node.type as any)?.displayName || (node.type as any)?.name || '';
          if (componentName === 'Slide' || componentName === 'VerticalSlide') {
            foundSplitter = true;
            // Save current slide if it has content
            if (currentSlide.length > 0) {
              slides.push(React.createElement(Slide, { key: slides.length, children: currentSlide }));
              currentSlide = [];
            }
            // Add the Slide component as-is, ensuring it has a key
            const slideKey = node.key || slides.length;
            slides.push(React.cloneElement(node, { key: slideKey }));
            return;
          }
          
          // Check if it's an <hr> element (horizontal rule)
          if (node.type === 'hr' || (typeof node.type === 'string' && node.type.toLowerCase() === 'hr')) {
            foundSplitter = true;
            // Save current slide and start a new one
            if (currentSlide.length > 0) {
              slides.push(React.createElement(Slide, { key: slides.length, children: currentSlide }));
              currentSlide = [];
            }
            return;
          }
          
          // Check if it's an h1 or h2 heading - start new slide
          const tagName = typeof node.type === 'string' ? node.type.toLowerCase() : '';
          if (tagName === 'h1' || tagName === 'h2') {
            foundSplitter = true;
            // Save current slide if it has content
            if (currentSlide.length > 0) {
              slides.push(React.createElement(Slide, { key: slides.length, children: currentSlide }));
              currentSlide = [];
            }
            currentSlide.push(node);
            return;
          }
          
          // For other elements (like divs, p, etc.), preserve them as-is
          // Don't recursively process - just add them to current slide
          // This ensures HTML elements render correctly
          currentSlide.push(node);
          return;
        }
        
        // Regular content - add to current slide
        currentSlide.push(node);
      };
      
      // Process all nodes
      if (Array.isArray(nodes)) {
        nodes.forEach(processNode);
      } else {
        processNode(nodes);
      }
      
      // Add the last slide if it has content
      if (currentSlide.length > 0) {
        slides.push(React.createElement(Slide, { key: slides.length, children: currentSlide }));
      }
      
      return { 
        slides: foundSplitter && slides.length > 0 ? slides : [], 
        hasSplits: foundSplitter 
      };
    };
    
    const result = splitIntoSlides(children);
    return result.slides.length > 0 ? result.slides : children;
  }, [children, autoSlides]);

  const slidesContent = htmlContent ? (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  ) : (
    processedChildren
  );

  const revealContent = (
    <>
      <button
        className={`${styles.fullscreenButton} ${isFullscreen ? styles.fullscreenButtonActive : ''}`}
        onClick={toggleFullscreen}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Enter fullscreen'}
      >
        {isFullscreen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3v5m0 0H3m5 0v5M16 3v5m0 0h5m-5 0v5M8 21v-5m0 0H3m5 0v-5M16 21v-5m0 0h5m-5 0v-5"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        )}
      </button>
      <div className="slides">
        {slidesContent}
      </div>
    </>
  );

  // Render fullscreen via portal
  if (isFullscreen && portalContainer) {
    return (
      <>
        {/* Keep the original element in place but hidden */}
        <div className={`reveal ${styles.revealContainer}`} ref={revealRef} data-theme={theme} style={{ display: 'none' }}>
          <div className="slides">
            {slidesContent}
          </div>
        </div>
        {/* Render fullscreen version via portal */}
        {createPortal(
          <div className={`reveal ${styles.revealContainer} ${styles.fullscreen}`} ref={fullscreenRevealRef} data-theme={theme}>
            {revealContent}
          </div>,
          portalContainer
        )}
      </>
    );
  }

  // Normal mode
  return (
    <div className={`reveal ${styles.revealContainer}`} ref={revealRef} data-theme={theme}>
      {revealContent}
    </div>
  );
}

// Component for individual slides with full Reveal.js support
export interface SlideProps {
  children: ReactNode;
  className?: string;
  // Reveal.js data attributes for slide formatting
  'data-background-color'?: string;
  'data-background-image'?: string;
  'data-background-size'?: string;
  'data-background-position'?: string;
  'data-background-repeat'?: string;
  'data-background-opacity'?: string;
  'data-background-video'?: string;
  'data-background-video-loop'?: boolean | string;
  'data-background-video-muted'?: boolean | string;
  'data-background-iframe'?: string;
  'data-background-interactive'?: boolean | string;
  'data-transition'?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
  'data-transition-speed'?: 'default' | 'fast' | 'slow';
  'data-auto-animate'?: boolean | string;
  'data-auto-animate-id'?: string;
  'data-auto-animate-easing'?: string;
  'data-auto-animate-duration'?: string;
  'data-auto-animate-unmatched'?: boolean | string;
  'data-state'?: string;
  'data-visibility'?: string;
  // Allow any other data-* attributes
  [key: `data-${string}`]: string | boolean | undefined;
}

export function Slide({ 
  children, 
  className = '',
  ...dataProps 
}: SlideProps) {
  // Extract all data-* props
  const dataAttributes: Record<string, string> = {};
  Object.keys(dataProps).forEach(key => {
    if (key.startsWith('data-')) {
      const value = dataProps[key as keyof typeof dataProps];
      // Convert boolean to string for HTML attributes
      if (typeof value === 'boolean') {
        dataAttributes[key] = value ? 'true' : 'false';
      } else if (value !== undefined && value !== null) {
        dataAttributes[key] = String(value);
      }
    }
  });

  return (
    <section className={className} {...dataAttributes}>
      {children}
    </section>
  );
}

// Component for nested slides (vertical slides)
export interface VerticalSlideProps extends SlideProps {}

export function VerticalSlide({ 
  children, 
  className = '',
  ...dataProps 
}: VerticalSlideProps) {
  // Extract all data-* props
  const dataAttributes: Record<string, string> = {};
  Object.keys(dataProps).forEach(key => {
    if (key.startsWith('data-')) {
      const value = dataProps[key as keyof typeof dataProps];
      if (typeof value === 'boolean') {
        dataAttributes[key] = value ? 'true' : 'false';
      } else if (value !== undefined && value !== null) {
        dataAttributes[key] = String(value);
      }
    }
  });

  return (
    <section className={className} {...dataAttributes}>
      {children}
    </section>
  );
}

