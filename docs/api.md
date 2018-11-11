FORMAT: 1A

# WEB API仕様

## タグリスト取得 [/tags/]

### タグリスト取得API [GET]

#### 処理概要

* すべてのタグのリストを取得する。

+ Response 200 (application/json)

    + Attributes
        + Tags(array)
            + (object)
                + id: 1 (number, required) - タグID
                + tag: XXXXX (string, required) - タグ


## 位置情報リスト取得 [/positions/]

### 位置情報リスト取得API [GET]

#### 処理概要

* すべての位置情報リストを取得する。

+ Response 200 (application/json)

    + Attributes
        + Positions(array)
            + (object)
                + id: 1 (number, required) - 位置情報ID
                + lat: 1.2345 (number, required) - 緯度
                + lng: 1.2345 (number, required) - 軽度


## 位置情報リスト取得 [/positions/{lat},{lng}]

### 位置情報リスト取得API [GET]

#### 処理概要

* 指定した緯度経度付近の位置情報リストを取得する。

+ Parameters

    + lat: 1.2345 (number, required) - 緯度（format: number）
    + lng: 1.2345 (number, required) - 軽度（format: number）

+ Response 200 (application/json)

    + Attributes
        + Positions(array)
            + (object)
                + id: 1 (number, required) - 位置情報ID
                + lat: 1.2345 (number, required) - 緯度
                + lng: 1.2345 (number, required) - 軽度



## 位置情報取得 [/positions/{position_id}]

### 位置情報取得API [GET]

#### 処理概要

* 位置情報の詳細を取得する。

+ Parameters

    + position_id: 1 (number, required) - 位置情報ID

+ Response 200 (application/json)

    + Attributes
        + Position(object)
            + id: 1 (number, required) - 位置情報ID
            + lat: 1.2345 (number, required) - 緯度
            + lng: 1.2345 (number, required) - 軽度
	        + Articles(array)
		        + (object)
			        + id: 1 (number, required) - 投稿ID
			        + user_id: 1 (number, required) - ユーザID
		        + Contents(array)
			        + (object)
				        + id: 1 (number, required) - コンテンツID
				        + content: XXX.XXX (string) - コンテンツ名
				        + mimetype: XXX/XXX (string) - MIME Type
		        + ArticleTags(array)
			        + (object)
				        + id: 1 (number, required) - タグID


## 投稿取得 [/article/{article_id}]

### 投稿取得API [GET]

#### 処理概要

* 投稿情報を取得する。

+ Parameters

    + article_id: 1 (number, required) - 投稿ID

+ Response 200 (application/json)

    + Attributes
        + Article(object)
	        + id: 1 (number, required) - 投稿ID
	        + user_id: 1 (number, required) - ユーザID
        + Contents(array)
	        + (object)
		        + id: 1 (number, required) - コンテンツID
		        + content: XXX.XXX (string) - コンテンツ名
		        + mimetype: XXX/XXX (string) - MIME Type
        + ArticleTags(array)
	        + (object)
		        + id: 1 (number, required) - タグID

## コンテンツ取得 [/public/images/{content_id}]

### コンテンツ取得API [GET]

#### 処理概要

* コンテンツ情報を取得する。

+ Parameters

    + content_id: 1 (number, required) - コンテンツID

+ Response 200 (image/jpeg)



## トークン発行 [/api/authenticate]

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


## 投稿 [/api/article]

### 投稿API [POST]

#### 処理概要

* 位置情報を投稿する。

+ Request (application/x-www-form-urlencoded)

    + Attributes
        + lat: 1.2345 (number, required) - 緯度（format: number）
        + lng: 1.2345 (number, required) - 軽度（format: number）
        + tag_id: 1 (number) - タグID（format: number）
        + file_data: xxxx (string) - ファイルデータ（format: string）

+ Response 200 (application/json)

    + Attributes
        + success: true (boolean, required) - 処理の成否
        + message: Authentication successfully (string) - メッセージ
        + position_id: 1 (number, required) - 位置情報ID
        + article_id: 1 (number, required) - 投稿ID
        + content_id: 1 (number, required) - コンテンツID

## 投稿画像追加 [/api/article/:article_id]

### 投稿画像追加API [POST]

#### 処理概要

* 投稿に画像を追加する。

+ Request (application/x-www-form-urlencoded)

    + Attributes
        + article_id: 1 (number, required) - 投稿ID（format: number）
        + file_data: xxxx (string) - ファイルデータ（format: string）

+ Response 200 (application/json)

    + Attributes
        + success: true (boolean, required) - 処理の成否
        + message: Authentication successfully (string) - メッセージ
        + content_id: 1 (number, required) - コンテンツID
