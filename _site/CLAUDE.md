# elections-scotland-2026

Scottish Parliament Election 2026 — manifesto tracker and policy comparison site.

## Stack

- Jekyll 4.3, no CSS framework (custom CSS in `assets/css/style.css`)
- Data-driven via `_data/` YAML files — no content is hardcoded in templates
- Vanilla JS for policy table filtering (`assets/js/filter.js`)

## Key files

| File | Purpose |
|------|---------|
| `_data/parties.yml` | Party list, colours, leaders, manifesto release status |
| `_data/policies.yml` | Policy areas and each party's commitment/summary |
| `_layouts/default.html` | Single layout used by all pages |
| `index.html` | Main page — manifesto tracker + policy comparison |
| `assets/css/style.css` | All styles |

## Updating content

### When a party publishes their manifesto
Edit `_data/parties.yml`:
- Set `manifesto_released: true`
- Set `manifesto_date` to the release date
- Set `manifesto_url` to the URL

### When adding/updating a policy commitment
Edit `_data/policies.yml`, find the policy area and the relevant party entry. Update:
- `status`: one of `committed`, `opposed`, `partial`, `tbc`
- `summary`: plain-English one or two sentence description (null if tbc)

### Adding a new policy area
Add a new block to `_data/policies.yml` following the existing structure. Include an entry for every party in `_data/parties.yml`.

## Development

```bash
bundle install
bundle exec jekyll serve --livereload
```

Site runs at http://localhost:4000
