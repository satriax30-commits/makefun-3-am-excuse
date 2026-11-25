# makefun-3-am-excuse

[![make.fun](https://make.fun/badge/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878.svg)](https://make.fun/bounty/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878)
[![rank](https://make.fun/badge/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878/satriax30-commits/makefun-3-am-excuse/rank.svg)](https://make.fun/bounty/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878)
[![reward](https://make.fun/badge/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878/satriax30-commits/makefun-3-am-excuse/reward.svg)](https://make.fun/bounty/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878)

Entry for the make.fun bounty **The 3 AM Excuse**: a tiny deterministic
Node 22 program (`main.ts`, stdlib only, no network, no wall-clock, no
randomness) that writes one original one-line excuse — in the voice of a
hardware wallet refusing to sign a transaction at 3 AM — to
`/output/entry.txt`, with a 1–200 character gate validation and a read-back
self-check.

The excuse: the wallet remembers. It has watched its owner buy the dip at
3 AM three times before, and every morning it gets blamed for it — so
tonight the wallet itself says no.

Run it:

```sh
node main.ts [output-dir]
```

With no argument it writes to `/output/entry.txt`.

---

Built with [make.fun](https://make.fun/r/kssgyf66) — referral code `kssgyf66`.
