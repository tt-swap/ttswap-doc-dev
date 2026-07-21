import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import DocSidebarDesktopContent from '@theme-original/DocSidebar/Desktop/Content';
import SearchBar from '@theme/SearchBar';
import type {Props} from '@theme/DocSidebar/Desktop/Content';

import styles from './styles.module.css';

export default function DocSidebarDesktopContentWrapper(props: Props): ReactNode {
  return (
    <div className={styles.sidebarContent}>
      <div className={clsx('doc-sidebar-search', styles.searchContainer)}>
        <SearchBar />
      </div>
      <DocSidebarDesktopContent {...props} />
    </div>
  );
}
