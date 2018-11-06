FORMAT: 1A

# WEB API仕様

## トークン発行 [/authenticate]

### トークン発行API [POST]

#### 処理概要

* 認証に成功した場合、アクセストークン(有効期間：2時間)を返す。
* 以下apiへのアクセスは、リクエスト本文・URLパラメータ(token)、HTTPヘッダ(x-access-token)いずれかにアクセストークンの値を設定が必要

+ Request (application/json)

    + Headers

            Accept: application/json

    + Attributes
        + name: user1 (string, required) - ログインID（format: string）
        + password: pass1 (string, required) - パスワード（pattern:^[0-9A-Za-z]{6,16}$）

+ Response 200 (application/json)

    + Attributes
        + success: true (boolean, required) - 認証の成否
        + message: Authentication successfully (string) - メッセージ
        + token: f58ba22059f5a8aa8f346e0f40987adab326041fac99029c909bef2c6300821a (string) - アクセストークン


## 位置情報リスト取得 [/api/positions/{lat},{lng}]

### 位置情報リスト取得API [GET]

#### 処理概要

* 指定した緯度経度付近の位置情報リストを取得する。

+ Parameters

    + lat: 1.2345 (number, required) - 緯度（format: number）
    + lng: 1.2345 (number, required) - 軽度（format: number）

+ Response 200 (application/json)

    + Attributes
        + positions(array)
            + (object)
                + position_id: 1 (number, required) - 位置情報ID
                + lat: 1.2345 (number, required) - 緯度
                + lng: 1.2345 (number, required) - 軽度

## 位置情報取得 [/api/position/{position_id}]

### 位置情報取得API [GET]

#### 処理概要

* 位置情報を取得する。

+ Parameters

    + position_id: 1 (number, required) - 位置情報ID

+ Response 200 (application/json)

    + Attributes
        + positions(array)
            + (object)
                + article_id: 1 (number, required) - 投稿ID


## 投稿取得 [/api/article/{article_id}]

### 投稿取得API [GET]

#### 処理概要

* 位置情報を取得する。

+ Parameters

    + article_id: 1 (number, required) - 投稿ID

+ Response 200 (application/json)

    + Attributes
        + article_id: 1 (number, required) - 投稿ID


## 投稿 [/api/article]

### 投稿API [POST]

#### 処理概要

* 位置情報を投稿する。

+ Request (application/x-www-form-urlencoded)

    + Attributes
        + lat: 1.2345 (number, required) - 緯度（format: number）
        + lng: 1.2345 (number, required) - 軽度（format: number）
        + file_data: xxxx (string) - ファイルデータ（format: string）

+ Response 200 (application/json)

    + Attributes
        + success: true (boolean, required) - 処理の成否
        + position_id: 1 (number, required) - 位置情報ID
        + article_id: 1 (number, required) - 投稿ID

