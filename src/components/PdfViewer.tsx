import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, {translate} from '@docusaurus/Translate';

import styles from './PdfViewer.module.css';

type Props = {
  /** English PDF path (default locale) */
  src?: string;
  /** Chinese PDF path; used when locale is zh */
  srcZh?: string;
  title?: string;
  height?: number | string;
};

export default function PdfViewer({
  src = '/docs/whitepaper_en.pdf',
  srcZh = '/docs/whitepaper.pdf',
  title,
  height = 900,
}: Props): React.ReactNode {
  const {i18n} = useDocusaurusContext();
  const isZh = i18n.currentLocale === 'zh';
  const resolvedSrc = useMemo(
    () => (isZh ? srcZh : src),
    [isZh, src, srcZh],
  );
  const resolvedTitle =
    title ??
    translate({
      id: 'pdfViewer.defaultTitle',
      message: 'PDF Preview',
      description: 'Default PDF viewer title',
    });

  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) {
      return;
    }

    try {
      if (document.fullscreenElement === el) {
        await document.exitFullscreen();
      } else {
        await el.requestFullscreen();
      }
    } catch {
      // Browser may block fullscreen without a user gesture or deny the API.
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.wrapper}
      style={isFullscreen ? undefined : {height}}>
      <div className={styles.toolbar}>
        <a
          className={styles.link}
          href={resolvedSrc}
          target="_blank"
          rel="noreferrer">
          <Translate id="pdfViewer.openNewTab">Open in new tab</Translate>
        </a>
        <a className={styles.link} href={resolvedSrc} download>
          <Translate id="pdfViewer.download">Download PDF</Translate>
        </a>
        <button
          type="button"
          className={styles.button}
          onClick={toggleFullscreen}
          aria-pressed={isFullscreen}>
          {isFullscreen ? (
            <Translate id="pdfViewer.exitFullscreen">Exit fullscreen</Translate>
          ) : (
            <Translate id="pdfViewer.fullscreen">Fullscreen</Translate>
          )}
        </button>
      </div>

      <iframe
        key={resolvedSrc}
        className={styles.frame}
        src={resolvedSrc}
        title={resolvedTitle}
      />
    </div>
  );
}
