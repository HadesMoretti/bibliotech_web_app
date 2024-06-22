"use client";
import styles from "./index.module.css";
import {
  XMarkIcon,
  TagIcon,
  ShoppingBagIcon,
  GiftIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Section, Item } from "./section";
import { useEffect, useRef, useState } from "react";
import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface SidebarProps {
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar }) => {
  const router = useRouter();
  const { user } = useUser();
  const ref = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [animationClass, setAnimationClass] = useState("");
  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => toggleSidebar(), 350);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setAnimationClass(styles.open ?? "");
    } else {
      setAnimationClass(styles.close ?? "");
    }
  }, [isSidebarOpen]);
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className={`${styles.container} ${animationClass}`} ref={ref}>
      <div className={styles.wrapper}>
        <XMarkIcon className={styles.closeIcon} onClick={closeSidebar} />
        <SignedOut>
          <h1 className={styles.title}>New around here?</h1>
          <SignInButton>
            <div className={styles.signInButton}>Sign In</div>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <h1 className={styles.welcomeText}>Welcome, {user?.fullName}</h1>
        </SignedIn>

        <div className={styles.sectionContainer}>
          {user?.publicMetadata.role === "admin" && (
            <div className={styles.sectionItem}>
              <Section Section="Admin Panel" Icon={WrenchScrewdriverIcon} />
              <Item
                Item="Publish"
                handleClick={() => {
                  router.push("/admin/publish");
                  closeSidebar();
                }}
              />
            </div>
          )}
          <div className={styles.sectionItem}>
            <Section Section="Categories" Icon={TagIcon} />
            <Item
              Item="Action"
              handleClick={() => {
                router.push("/categories/action");
                closeSidebar();
              }}
            />
            <Item
              Item="Fiction"
              handleClick={() => {
                router.push("/categories/fiction");
                closeSidebar();
              }}
            />
            <Item
              Item="Thriller"
              handleClick={() => {
                router.push("/categories/thriller");
                closeSidebar();
              }}
            />
            <Item
              Item="Comedy"
              handleClick={() => {
                router.push("/categories/comedy");
                closeSidebar();
              }}
            />
            <Item
              Item="Romance"
              handleClick={() => {
                router.push("/categories/romance");
                closeSidebar();
              }}
            />
            <Item
              Item="Mistery"
              handleClick={() => {
                router.push("/categories/mistery");
                closeSidebar();
              }}
            />
            <Item
              Item="Comics"
              handleClick={() => {
                router.push("/categories/comics");
                closeSidebar();
              }}
            />
            <Item
              Item="Science Fiction"
              handleClick={() => {
                router.push("/categories/science-fiction");
                closeSidebar();
              }}
            />
          </div>
          <div className={styles.sectionItem}>
            <Section Section="Trending" Icon={ShoppingBagIcon} />
            <Item Item="Best Sellers" />
            <Item Item="Trending Now" />
            <Item Item="New Releases" />
          </div>
          <div className={styles.sectionItem}>
            <Section Section="Our Recommendation" Icon={GiftIcon} />
            <Item Item="Users favorite" />
            <Item Item="Best Offers" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
