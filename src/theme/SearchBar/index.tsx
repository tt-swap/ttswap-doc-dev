import React, {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import {useLocation} from '@docusaurus/router';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {translate} from '@docusaurus/Translate';
import OriginalSearchBar from '@theme-original/SearchBar';
import type {Props} from '@theme/SearchBar';

import styles from './styles.module.css';

function isModK(event: KeyboardEvent): boolean {
  return (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
}

export default function SearchBar(props: Props): ReactNode {
  const isBrowser = useIsBrowser();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastPath = useRef(location.pathname);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (isModK(event)) {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isBrowser]);

  useEffect(() => {
    if (location.pathname !== lastPath.current) {
      lastPath.current = location.pathname;
      setOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    document.body.classList.toggle('search-modal-open', open);
    return () => document.body.classList.remove('search-modal-open');
  }, [isBrowser, open]);

  useEffect(() => {
    if (!open || !isBrowser) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const input = modalRef.current?.querySelector<HTMLInputElement>(
        '.navbar__search-input',
      );
      input?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [open, isBrowser]);

  const placeholder = translate({
    id: 'theme.SearchBar.label',
    message: 'Search',
    description: 'The ARIA label and placeholder for search button',
  });

  const shortcutLabel =
    isBrowser && /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? '⌘K' : 'Ctrl+K';

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={openModal}
        aria-label={placeholder}>
        <span className={styles.triggerIcon} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.106a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
          </svg>
        </span>
        <span className={styles.triggerText}>{placeholder}</span>
        <kbd className={styles.triggerShortcut}>{shortcutLabel}</kbd>
      </button>

      {open &&
        isBrowser &&
        createPortal(
          <div
            className={clsx(styles.overlay, 'search-modal-root')}
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}>
            <div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-label={placeholder}
              ref={modalRef}
              onMouseDown={(event) => event.stopPropagation()}>
              <div className={styles.modalSearch}>
                <OriginalSearchBar {...props} />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
