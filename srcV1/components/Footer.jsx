import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <div className={styles.footer}>
      <footer>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Worldwise Inc
        </p>
      </footer>
    </div>
  );
}
