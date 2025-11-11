import Link from 'next/link';
import { client, Area } from '@/lib/microcms';
import styles from './page.module.css';

export default async function Home() {
  const data = await client.get({
    endpoint: 'areas',
  });

  const areas: Area[] = data.contents;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>沖縄天気ナビ</h1>
      <p className={styles.description}>地域を選択して天気情報を確認</p>
      
      <div className={styles.grid}>
        {areas.map((area) => (
          <Link href={`/areas/${area.id}`} key={area.id} className={styles.card}>
            {area.image && (
              <img src={area.image.url} alt={area.name} className={styles.image} />
            )}
            <h2>{area.name}</h2>
            <p>{area.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}