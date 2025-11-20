"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Area } from "@/lib/microcms";
import styles from "../page.module.css";
import SearchBar from "./SearchBar";

interface AreaListProps {
  areas: Area[];
  areaFeatures: Record<string, { badge: string; icon: string; tip: string }>;
}

export default function AreaList({ areas, areaFeatures }: AreaListProps) {
  const [filteredAreas, setFilteredAreas] = useState<Area[]>(areas);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      setFavorites(storedFavorites);
    };

    loadFavorites();

    // Listen for changes to favorites
    const handleStorageChange = () => {
      loadFavorites();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const removeFavorite = (e: React.MouseEvent, areaId: string) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    const newFavorites = favorites.filter((id) => id !== areaId);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const handleSearch = (query: string) => {
    const filtered = areas.filter(
      (area) =>
        area.name.toLowerCase().includes(query.toLowerCase()) ||
        area.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAreas(filtered);
  };

  const displayAreas = showFavoritesOnly
    ? filteredAreas.filter((area) => favorites.includes(area.id))
    : filteredAreas;

  return (
    <>
      <SearchBar onSearch={handleSearch} />

      <div className={styles.filterButtons}>
        <button
          className={`${styles.filterButton} ${
            !showFavoritesOnly ? styles.active : ""
          }`}
          onClick={() => setShowFavoritesOnly(false)}
        >
          すべての地域
        </button>
        <button
          className={`${styles.filterButton} ${
            showFavoritesOnly ? styles.active : ""
          }`}
          onClick={() => setShowFavoritesOnly(true)}
        >
          ⭐ お気に入り ({favorites.length})
        </button>
      </div>

      <div className={styles.grid}>
        {displayAreas.length > 0 ? (
          displayAreas.map((area, index) => {
            const feature = areaFeatures[area.id] || {
              badge: "観光地",
              icon: "🌺",
              tip: "魅力的なスポット",
            };

            return (
              <Link
                href={`/areas/${area.id}`}
                key={area.id}
                className={styles.card}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {area.image && (
                  <div className={styles.imageWrapper}>
                    <div className={styles.badge}>{feature.badge}</div>
                    {favorites.includes(area.id) && (
                      <div className={styles.favoriteBadge}>
                        ⭐
                        <button
                          className={styles.removeButton}
                          onClick={(e) => removeFavorite(e, area.id)}
                          title="お気に入りから削除"
                          aria-label="お気に入りから削除"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    <Image
                      src={area.image.url}
                      alt={area.name}
                      className={styles.image}
                      width={400}
                      height={220}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{area.name}</h2>
                  <p className={styles.cardDescription}>{area.description}</p>

                  <div className={styles.cardInfo}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>{feature.icon}</span>
                      <span className={styles.infoText}>{feature.tip}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>🌡️</span>
                      <span className={styles.infoText}>リアルタイム気温</span>
                    </div>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <span>天気を見る</span>
                  <span className={styles.liveIndicator}>
                    <span className={styles.pulse}></span>
                    Live
                  </span>
                </div>
              </Link>
            );
          })
        ) : (
          <div className={styles.noResults}>
            <p>該当する地域が見つかりませんでした</p>
          </div>
        )}
      </div>
    </>
  );
}
