# Roadmap: site + tools

Re-audited 2026-09-24 against GitHub, npm, the MCP registry, and the live site. The June P0 trust breakers are fixed: tieline and bouncer repos are public, Òtítọ́ releases match npm, bouncer's example path is generic, every tool README has a demo gif, every repo has a description, homepage, and topics, and the site has per-page metadata, a sitemap, and a contact path. No outbound link on the site is broken.

## P0: finish retiring Òtítọ́'s predecessor (other repos)

The retired context tool that Òtítọ́ replaced is still visible in places that point people at it:

1. **MCP registry** still lists the retired server as active under `io.github.nugehs`, so the site's MCP link (`registry.modelcontextprotocol.io/?q=nugehs`) shows it. Mark it deprecated or remove it.
2. **npm deprecation message** on the retired package says there is no replacement. Point it at `@bashbop/otito`.
3. **GitHub repo** for the retired tool is public and not archived. Archive it with a README pointer to BASHBOP/otito.
4. **gate's repo description** still lists the retired tool among the tools gate feeds.
5. **Sibling READMEs** (gate, aiglare, tieline, bouncer) link the retired tool instead of Òtítọ́.
6. **Profile README** (nugehs/nugehs) lists four tools, links the retired one, leaves out gate, and says "Commerce systems at Sky" while this site says NBCUniversal.

## P1: discovery

7. **Pin gate** on the GitHub profile; it is the flagship and the only tool not pinned.
8. **Umbrella page**: `bashbop.github.io` and `nugehs.github.io` both 404, and the Òtítọ́ site does not link the other tools. One page telling the trust-layer story (context, contracts, compliance, governance; local-first, MCP-native), linked from every README.
9. **Comparison pages**: Òtítọ́ vs Sourcegraph/CLAUDE.md, tieline vs Pact/openapi-diff/Optic, bouncer vs semgrep/policy-as-code, aiglare vs guardrails-ai/runtime validators. Only Òtítọ́'s README has a "How it compares" section today.
10. **Launch footprint**: no Show HN, dev.to, or X threads found. For aiglare, run it on 20 popular OSS AI repos and publish the findings.

## P2: site

11. **SoftwareApplication JSON-LD** on each tool page (`/open-source/<slug>/`), alongside the existing Person schema.
12. **Old portrait in git history**: the portrait committed in `bbcac9e` carried GPS coordinates. The shipped file is clean and a test blocks EXIF, but the original is still reachable in this public repo's history until the history is rewritten.

## Suggested order

P0 first (an afternoon across the other repos), then pin gate and build the umbrella page. Comparison pages and launch posts after.
