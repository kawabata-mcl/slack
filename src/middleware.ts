import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * 認証ミドルウェア
 * - ユーザーの認証状態を確認
 * - 未認証ユーザーを認証ページにリダイレクト
 * - 認証済みユーザーのセッション管理
 */
export async function middleware(request: NextRequest) {
  // 初期レスポンスオブジェクトの作成
  let response = NextResponse.next({
    request,
  });

  /**
   * Supabaseクライアントの初期化
   * SSR環境でのクッキー管理を設定
   */
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // クッキーの取得処理
        getAll() {
          return request.cookies.getAll();
        },
        // クッキーの設定処理
        setAll(cookiesToSet) {
          // リクエストへのクッキー設定
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          // レスポンスの更新
          response = NextResponse.next({
            request,
          });
          // レスポンスへのクッキー設定
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  /**
   * 重要: レスポンスオブジェクトの取り扱いについて
   * 1. 新しいレスポンスオブジェクトを作成する場合は、必ずrequestを渡す
   *    例: const myNewResponse = NextResponse.next({ request })
   *
   * 2. クッキーを正しくコピー
   *    例: myNewResponse.cookies.setAll(response.cookies.getAll())
   *
   * 3. レスポンスオブジェクトの変更時はクッキーを変更しない
   *
   * 4. 最後に修正したレスポンスオブジェクトを返す
   *
   * これらの手順を守らないと、ブラウザとサーバーの同期が取れなくなり、
   * ユーザーセッションが予期せず終了する可能性があります。
   */
  return response;
}
