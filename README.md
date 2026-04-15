# Scotland Votes 2026

Track Scottish party manifestos and compare policies side by side. Built for voters.

Live at **[scotvotes.scot](https://scotvotes.scot)** — Scottish Parliament election, 7 May 2026.

---

## What it does

- Tracks manifesto release dates for every major party
- Compares party commitments across 13 policy areas in one table
- Filterable by policy area so you can focus on what matters to you
- Updated as manifestos are published

Non-partisan. No ads. No tracking beyond basic analytics.

## Stack

- [Jekyll](https://jekyllrb.com) 4.3 — static site, no database
- Pure CSS, no frameworks
- Vanilla JS for table filtering
- Hosted on GitHub Pages
- Analytics via [GoatCounter](https://www.goatcounter.com) (privacy-first, no cookies)

## Run locally

```bash
git clone https://github.com/YOUR-USERNAME/elections-scotland-2026
cd elections-scotland-2026
bundle install
bundle exec jekyll serve --livereload
```

Site runs at `http://localhost:4000`.

## Updating content

All content lives in two YAML files — no need to touch templates.

### When a party publishes their manifesto

Edit `_data/parties.yml`:

```yaml
manifesto_released: true
manifesto_date: "16 April 2026"
manifesto_url: "https://example.com/manifesto"
```

### When adding a policy commitment

Edit `_data/policies.yml`, find the policy area and the relevant party entry:

```yaml
- party: snp
  status: committed        # committed | opposed | partial | tbc
  summary: "Plain-English description of the commitment."
```

### Adding a new policy area

Add a block to `_data/policies.yml` following the existing structure. Include an entry for every party in `_data/parties.yml`.

## Contributing

Spotted an error or a missing commitment? Contributions welcome.

1. Fork the repo
2. Update the relevant `_data/` file
3. Open a pull request with a source link in the description

Please link to an official party source (manifesto PDF, party website) for any policy data you add or change.

## Licence

MIT — see [LICENSE](LICENSE).
