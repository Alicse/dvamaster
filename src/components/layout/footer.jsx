import React, {PropTypes} from 'react'
import styles from './main.less'
import { menu } from '../../utils/menu'

const Footer = () => {
  return (
    <div className={styles.footer}>
      {config.footerText}
    </div>
  );
}

export default Footer;
