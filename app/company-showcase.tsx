import styles from './company-showcase.module.css';

const companies = [
  {
    "name": "Accenture",
    "url": "https://www.accenture.com/",
    "slug": "accenture",
    "compact": false
  },
  {
    "name": "DHL Group",
    "url": "https://www.dhl.com/",
    "slug": "dhl",
    "compact": false
  },
  {
    "name": "Deloitte",
    "url": "https://www.deloitte.com/",
    "slug": "deloitte",
    "compact": false
  },
  {
    "name": "The Home Depot",
    "url": "https://www.homedepot.com/",
    "slug": "homedepot-complete",
    "compact": true
  },
  {
    "name": "EY",
    "url": "https://www.ey.com/",
    "slug": "ey",
    "compact": true
  },
  {
    "name": "PwC",
    "url": "https://www.pwc.com/",
    "slug": "pwc",
    "compact": false
  },
  {
    "name": "Costco Wholesale",
    "url": "https://www.costco.com/",
    "slug": "costco",
    "compact": false
  },
  {
    "name": "Siemens",
    "url": "https://www.siemens.com/",
    "slug": "siemens",
    "compact": false
  },
  {
    "name": "KPMG",
    "url": "https://kpmg.com/",
    "slug": "kpmg",
    "compact": false
  },
  {
    "name": "IBM",
    "url": "https://www.ibm.com/",
    "slug": "ibm",
    "compact": false
  },
  {
    "name": "Samsung Electronics",
    "url": "https://www.samsung.com/",
    "slug": "samsung",
    "compact": false
  },
  {
    "name": "Brookfield",
    "url": "https://www.brookfield.com/",
    "slug": "brookfield",
    "compact": false
  },
  {
    "name": "George Weston Limited",
    "url": "https://www.weston.ca/",
    "slug": "weston",
    "compact": false
  },
  {
    "name": "Google",
    "url": "https://about.google/",
    "slug": "google",
    "compact": false
  },
  {
    "name": "CBRE",
    "url": "https://www.cbre.com/",
    "slug": "cbre",
    "compact": false
  },
  {
    "name": "McDonald's",
    "url": "https://www.mcdonalds.com/",
    "slug": "mcdonalds",
    "compact": true
  },
  {
    "name": "Marriott International",
    "url": "https://www.marriott.com/",
    "slug": "marriott",
    "compact": true
  },
  {
    "name": "Publicis Groupe",
    "url": "https://www.publicisgroupe.com/",
    "slug": "publicis",
    "compact": true
  },
  {
    "name": "TELUS",
    "url": "https://www.telus.com/",
    "slug": "telus",
    "compact": false
  },
  {
    "name": "BASF",
    "url": "https://www.basf.com/",
    "slug": "basf",
    "compact": false
  }
];

export function CompanyShowcase() {
  return (
    <section id="companies-aboard" className={styles.band} aria-labelledby="companies-aboard-title">
      <h2 id="companies-aboard-title" className={styles.heading}>Companies we’ve welcomed aboard</h2>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {[false, true].map((duplicate) => (
            <ul className={styles.logos} key={String(duplicate)} aria-label={duplicate ? undefined : 'Companies we’ve welcomed aboard'} aria-hidden={duplicate || undefined}>
              {companies.map((company) => (
                <li key={company.slug}>
                  <a href={company.url} target="_blank" rel="noopener noreferrer" title={company.name} tabIndex={duplicate ? -1 : undefined} aria-label={`${company.name} (opens in a new tab)`}>
                    <img src={`/company-logos/${company.slug}.svg`} alt={company.name} width="120" height="48" loading="eager" decoding="async" className={company.compact ? styles.compact : undefined} />
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
