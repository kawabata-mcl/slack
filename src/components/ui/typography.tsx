import { cn } from '@/lib/utils';
import { FC } from 'react';

/**
 * プロパティの型定義
 * タイポグラフィコンポーネントで使用可能な見出しレベルと段落
 */
type TypographyProps = {
  /** 表示するタグの種類 */
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  /** 表示するテキスト内容 */
  text: string;
  /** 追加のCSSクラス */
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

/**
 * タイポグラフィコンポーネント
 *
 * 異なる見出しレベルや段落のスタイルを簡単に適用できるコンポーネント
 * レスポンシブデザインに対応し、デバイスサイズに応じてフォントサイズが変化
 *
 * @param {TypographyProps} props - コンポーネントのプロパティ
 * @returns {React.ReactElement} スタイル付きのタイポグラフィ要素
 */
const Typography: FC<TypographyProps> = ({
  variant = 'h1',
  text,
  className,
  ...props
}) => {
  /** 各バリアントに対応するデフォルトのCSSクラス */
  const classNames = {
    h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
    h2: 'scroll-m-16 text-3xl font-bold tracking-tight lg:text-4xl',
    h3: 'scroll-m-12 text-2xl font-semibold tracking-tight lg:text-3xl',
    h4: 'scroll-m-10 text-xl font-medium tracking-tight lg:text-2xl',
    h5: 'scroll-m-8 text-lg font-normal tracking-tight lg:text-xl',
    h6: 'scroll-m-6 text-base font-normal tracking-tight lg:text-xl',
    p: 'scroll-m-4 text-sm font-normal tracking-tight lg:text-base',
  };

  /** 選択されたバリアントのHTMLタグ */
  const Tag = variant;

  /** デフォルトのクラス名 */
  const defaultClassName = classNames[variant];

  /** カスタムクラスと結合したクラス名 */
  const combinedClassName = cn(defaultClassName, className);

  return (
    <Tag className={combinedClassName} {...props}>
      {text}
    </Tag>
  );
};

export default Typography;
