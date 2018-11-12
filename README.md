opendata-app
====

## Usage
下記をインストールする必要があります。

[node.js](https://nodejs.org/ja/)

[Git for windows](https://gitforwindows.org/)

## Install

Windowsコマンドプロンプト起動（管理者権限が必要）
```
npm install sequelize-cli -g
```

Windowsコマンドプロンプト起動

```
git clone https://github.com/jmixnet/opendata-app.git

cd opendata-app

npm install

sequelize db:migrate

sequelize db:seed:all

node start
```

ブラウザにて下記URLを起動
```
http://localhost:3000/tags
```

※[ER図](https://jmixnet.github.io/opendata-app/)、[WEB API仕様書](https://jmixnet.github.io/opendata-app/api.html)を参照してください。


## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)
