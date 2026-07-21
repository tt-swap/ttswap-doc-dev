import React, {type ReactNode} from 'react';
import DocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import {ShareButton} from '@site/src/components/ShareButton';
import styles from './styles.module.css';

export default function DocBreadcrumbsWrapper(): ReactNode {
  return (
    <div className={styles.breadcrumbsRow}>
      <DocBreadcrumbs />
      <div className={styles.breadcrumbsActions}>
        <ShareButton inline />
      </div>
    </div>
  );
}
