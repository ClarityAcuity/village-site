---
title: "HTTP"
date: "2021-04-11"
updated: "2021-04-11"
author: Villager Liao
featured: ./images/http.png
keywords:
  - http
  - web standard
---

# Hypertext Transfer Protocol

## Method

1.0 defind `GET`, `POST`, `HEAD`, 1.1 add `OPTIONS`, `PUT`, `DELETE`, `TRACE` and `CONNECT`

- `GET`請求獲取Request-URI所標識的資源

      - no side effect
      - cacheable
      - query params, not secure

- `POST`在Request-URI所標識的資源後附加新的數據
      - side effect
      - uncacheable
      - body
- `PUT`請求服務器存儲一個資源，並用Request-URI作為其標識
      - no side effect
- `DELETE`請求服務器刪除Request-URI所標識的資源
- `PATCH`用於對資源進行部分修改
      - no side effect
      - update part of resource
- `HEAD`請求獲取由Request-URI所標識的資源的響應消息報頭
      - head only same as GET
- `OPTIONS`請求查詢服務器的性能，或者查詢與資源相關的選項和需求
      - check server support methods
- `TRACE`請求服務器回送收到的請求信息，主要用於測試或診斷
- `CONNECT`保留將來使用
      - HTTP/1.1協議中預留給能夠將連接改為管道方式的代理服務器

## Request

- User-Agent
- Accept
- Host

## Reponse

- Header

## Connection

- `keep-alive`: keep a reusable connection
較少的CPU和內存的使用（由於同時打開的連接的減少了）
允許請求和應答的HTTP管線化
降低擁塞控製 （TCP連接減少了）
減少了後續請求的延遲（無需再進行握手）
報告錯誤無需關閉TCP連

## Cache

- `cache-control`
      - no-cache
      - private
      - must-revalidate
      - max-age

| broswer operation | server response | cache |
| - |:-:| -:|
| new tab | `private` `no-cache` `must-revalidate` | age < `max-age` |
| resend | `no cache` | `max-age`, `private` `must-revalidate` only first time |
| back | `no cache` | `max-age` `private` `must-revalidate` |
| refresh | `no cache` `max-age` `private` `must-revalidate` |  |

- `last-modified`

      - `If-Modify-Since`: response status code: `304 Not Modified`
      - else response status code: `200 OK`, with new `last-modified`

- `Etag`
      - check etag to ensure resource is not updated even it has been `touch`
      - `If-None-Match` update status = `200`, else status = `304`

- `encoding`
      - `Accept-Encoding`: client emit support compress method, gzip, deflate, sdch, br etc.
      - `Content-Encoding`: server response

- `cookie`
      - always involve in header
      - `set-cookie`: sessionId

## Status

- 1xx（臨時響應）錶示臨時響應並需要請求者繼續執行操作的狀態碼
      - 100 繼續 請求者應當繼續提出請求。服務器返回此代碼錶示已收到請求的第一部分，正在等待其餘部分
      - 101 切換協議 請求者已要求服務器切換協議，服務器已確認並準備切換

- 2XX
      - 200 OK 錶示從客戶端發來的請求在服務器端被正確處理
      - 201 Created 請求已經被實現，而且有一個新的資源已經依據請求的需要而建立
      - 202 Accepted 請求已接受，但是還冇執行，不保證完成請求
      - 204 No content，錶示請求成功，但響應報文不含實體的主體部分
      - 206 Partial Content，部分內容 服務器成功處理了部分GET請求

- 3XX 重定嚮
302是http1.0的協議狀態碼，在http1.1版本的時候為了細化302狀態碼又出來了兩個303和307。
303明確錶示客戶端應當採用get方法獲取資源，他會把POST請求變為GET請求進行重定嚮。
307會遵照瀏覽器標準，不會從post變為get。
      - 301 moved permanently，永久性重定嚮，錶示資源已被分配了新的 URL
      - 302 found，臨時性重定嚮，錶示資源臨時被分配了新的 URL
      - 303 see other，錶示資源存在著另一個 URL，應使用 GET 方法丁香獲取資源
      - 304 not modified，錶示服務器允許訪問資源，但因發生請求未滿足條件的情況
      - 307 temporary redirect，臨時重定嚮，和302含義相同

- 4XX 客戶端錯誤
      - 400 bad request，請求報文存在語法錯誤
      - 401 unauthorized，錶示發送的請求需要有通過 HTTP 認證的認證信息
      - 403 forbidden，錶示對請求資源的訪問被服務器拒絕
      - 404 not found，錶示在服務器上冇有找到請求的資源
      - 408 Request timeout, 客戶端請求超時
      - 409 Confict, 請求的資源可能引起沖突

- 5XX 服務器錯誤
      - 500 internal sever error，錶示服務器端在執行請求時發生了錯誤
      - 501 Not Implemented 請求超出服務器能力範圍，例如服務器不支持當前請求所需要的某個功能，或者請求是服務器不支持的某個方法
      - 503 service unavailable，錶明服務器暫時處於超負載或正在停機維護，無法處理請求
      - 505 http version not supported 服務器不支持，或者拒絕支持在請求中使用的 HTTP 版本

## HTTPS

因為http協議的數據都是明文進行傳輸的，所以對於一些敏感信息的傳輸就很不安全，HTTPS就是為了解決HTTP的不安全而生的。
      - need SSL and certificate
      - HTTP和HTTPS使用的是完全不同的連接方式，用的端口也不一樣，前者是80，後者是443

- 非對稱加密：

- 私鑰 + 公鑰= 密鑰對
即用私鑰加密的數據,隻有對應的公鑰才能解密,用公鑰加密的數據,隻有對應的私鑰才能解密
因為通信雙方的手裏都有一套自己的密鑰對,通信之前雙方會先把自己的公鑰都先發給對方
然後對方再拿著這個公鑰來加密數據響應給對方,等到到了對方那裏,對方再用自己的私鑰進行解密

- 非對稱加密雖然安全性更高，但是帶來的問題就是速度很慢，影響性能。
解決方案：
那麼結合兩種加密方式，將對稱加密的密鑰使用非對稱加密的公鑰進行加密，然後發送出去，接收方使用私鑰進行解密得到對稱加密的密鑰，然後雙方可以使用對稱加密來進行溝通。
- 此時又帶來一個問題，中間人問題：
如果此時在客戶端和服務器之間存在一個中間人,這個中間人隻需要把原本雙方通信互發的公鑰,換成自己的公鑰,這樣中間人就可以輕鬆解密通信雙方所發送的所有數據。
所以這個時候需要一個安全的第三方頒發證書（CA），證明身份的身份，防止被中間人攻擊。
證書中包括：簽發者、證書用途、使用者公鑰、使用者私鑰、使用者的HASH算法、證書到期時間等
但是問題來了，如果中間人篡改了證書，那麼身份證明是不是就無效了？這個證明就白買了，這個時候需要一個新的技術，數字簽名。
- 數字簽名就是用CA自帶的HASH算法對證書的內容進行HASH得到一個摘要，再用CA的私鑰加密，最終組成數字簽名。
當別人把他的證書發過來的時候,我再用同樣的Hash算法,再次生成消息摘要，然後用CA的公鑰對數字簽名解密,得到CA創建的消息摘要,兩者一比,就知道中間有冇有被人篡改了。

## HTTP2

- 二進製分幀（Binary Format）
幀：HTTP/2 會將所有傳輸的信息分割為更小的消息和幀（frame）,並對它們採用二進製格式的編碼 ，其中 HTTP/2 的首部信息會被封裝到 HEADER frame，而相應的 Request Body 則封裝到 DATA frame 裏麵。
流：存在於連接中的一個虛擬通道。流可以承載雙嚮消息，每個流都有一個唯一的整數ID
HTTP/2 採用二進製格式傳輸數據，而非 HTTP 1.x 的文本格式，二進製協議解析起來更高效

- 服務器推送（server push）
服務端可以在發送頁麵HTML時主動推送其它資源，而不用等到瀏覽器解析到相應位置，發起請求再響應。例如服務端可以主動把JS和CSS文件推送給客戶端，而不需要客戶端解析HTML時再發送這些請求。
服務端可以主動推送，客戶端也有權利選擇是否接收。如果服務端推送的資源已經被瀏覽器緩存過，瀏覽器可以通過發送RST_STREAM幀來拒收。主動推送也遵守同源策略，服務器不會隨便推送第三方資源給客戶端。

- 頭部壓縮
HTTP/1.x會在請求和響應中中重複地攜帶不常改變的、冗長的頭部數據，給網絡帶來額外的負擔。
      - HTTP/2在客戶端和服務器端使用“首部錶”來跟蹤和存儲之前發送的鍵－值對，對於相同的數據，不再通過每次請求和響應發送
      - 首部錶在HTTP/2的連接存續期內始終存在，由客戶端和服務器共同漸進地更新;
      - 每個新的首部鍵－值對要麼被追加到當前錶的末尾，要麼替換錶中之前的值。

你可以理解為隻發送差異數據，而不是全部發送，從而減少頭部的信息量

- 多路複用（MultiPlexing）
HTTP 1.x 中，如果想並發多個請求，必須使用多個 TCP 鏈接，且瀏覽器為了控製資源，還會對單個域名有 6-8個的TCP鏈接請求限製。

HTTP2中：
      - 同域名下所有通信都在單個連接上完成。
      - 單個連接可以承載任意數量的雙嚮數據流。
      - 數據流以消息的形式發送，而消息又由一個或多個幀組成，多個幀之間可以亂序發送，因為根據幀首部的流標識可以重新組裝

## Limitations

- Maximum concurrent connections to the same domain: 6, in general

| browser | connection limit |
| - | - |
| Internet Explorer® 7.0 | 2 |
| Internet Explorer 8.0 and 9.0 | 6 |
| Internet Explorer 10.0 | 8 |
| Internet Explorer 11.0 | 13 |
| Firefox® | 6 |
| Chrome™ | 6 |
| Safari® | 6 |
| Opera® | 6 |
| iOS® | 6 |
| Android™ | 6 |
