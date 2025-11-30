## ローカル環境の立ち上げ

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## ローカル環境のChartページについて

Chartページをローカル環境で表示させるには、
政府統計の総合窓口（e-Stat）の登録が必要になります。
登録後、下記の環境変数を設定してください。

E_START_API_ID => ご自身のIDを設定

E_START_API_URL => http://api.e-stat.go.jp/rest/3.0/app/json/getStatsData

E_START_INBOUND_ID => 0003317280
