"use client";

import { useState, useEffect } from "react";
import styles from "./FavoriteButton.module.css";

interface FavoriteButtonProps {
  areaId: string;
  areaName: string;
}

export default function FavoriteButton({
  areaId,
  areaName,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(areaId));
  }, [areaId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let newFavorites;

    if (favorites.includes(areaId)) {
      newFavorites = favorites.filter((id: string) => id !== areaId);
      setIsFavorite(false);
    } else {
      newFavorites = [...favorites, areaId];
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <button
      className={`${styles.favoriteButton} ${isFavorite ? styles.active : ""}`}
      onClick={toggleFavorite}
      aria-label={isFavorite ? "お気に入りから削除" : "お気に入りに追加"}
    >
      {isFavorite ? "⭐" : "☆"} {isFavorite ? "お気に入り済み" : "お気に入り"}
    </button>
  );
}
