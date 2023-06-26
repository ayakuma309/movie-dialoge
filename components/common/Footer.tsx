import React from "react";
import Link from "next/link";

const Footer: React.FC =() => {
  return (
    <footer className="text-white body-font">
      <div className="container mx-auto flex flex-col">
        <div className="flex flex-col text-center">
          <nav className="list-none mb-1">
            <li>
              <Link
                href="/terms"
              >
                利用規約
              </Link>
            </li>
            <li>
              <Link
                href="/privacyPolicy"
              >
                プライバシーポリシー
              </Link>
            </li>
          </nav>
          <p className="text-sm text-center mt-2">
            © 2023 セリフの映画館
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
