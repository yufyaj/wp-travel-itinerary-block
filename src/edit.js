/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, RangeControl, ColorPicker } from '@wordpress/components';
import { alignLeft, alignCenter, alignRight, alignWide, alignFull } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './editor.scss'; // エディタ専用スタイルをインポート

// このブロック内で許可する子ブロックのリスト
const ALLOWED_BLOCKS = [ 'wp-travel-itinerary/location', 'wp-travel-itinerary/info' ];

// ブロック追加時の初期テンプレート構造
const TEMPLATE = [
	[ 'wp-travel-itinerary/location', { placeholder: __('出発地を入力', 'wp-travel-itinerary-block') } ],
	[ 'wp-travel-itinerary/info', { placeholder: __('移動情報を入力', 'wp-travel-itinerary-block') } ],
	[ 'wp-travel-itinerary/location', { placeholder: __('目的地を入力', 'wp-travel-itinerary-block') } ],
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates block attributes.
 * @param {string}   props.clientId      Block client ID.
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	// 属性を取得し、デフォルト値を設定
	const {
        orientation = 'vertical', // デフォルト値 'vertical'
        style, // 色やグラデーション情報 (useBlockProps が自動で処理)
        locationCommonWidth = 180, // デフォルト値 180
        infoCommonWidth = 100,   // デフォルト値 100
		infoVerticalMinHeight = 60, // デフォルト値 60
    } = attributes;

	// CSSカスタムプロパティの値を準備 (値が存在する場合のみ px を付与)
	const blockStyle = {
		'--location-common-width': locationCommonWidth ? `${locationCommonWidth}px` : undefined,
		'--info-common-width': infoCommonWidth ? `${infoCommonWidth}px` : undefined,
		'--info-vertical-min-height': infoVerticalMinHeight ? `${infoVerticalMinHeight}px` : undefined,
        '--show-borders': attributes.showBorders ? '1' : '0',
        '--border-color': attributes.defaultBorderColor || '#ccc',
        '--border-width': attributes.defaultBorderWidth ? `${attributes.defaultBorderWidth}px` : '1px',
        '--border-style': attributes.showBorders ? 'solid' : 'none'
	};

	// useBlockProps フックを使用して、ブロックのラッパー要素に必要な属性とスタイルを取得・設定
	// className に現在の orientation を反映
	// style には CSS カスタムプロパティを設定 (標準の色・グラデーションは useBlockProps が内部で style 属性から適用)
	const blockProps = useBlockProps( {
		className: `travel-itinerary-container orientation-${ orientation }`,
		style: blockStyle
	} );

	return (
		// <> は React Fragment。複数の要素を返す場合に必要。
		<>
			{/* InspectorControls: エディタ右側のサイドバー（設定パネル） */}
			<InspectorControls>
				{/* PanelBody: 設定項目をグループ化するパネル */}
				<PanelBody title={ __( 'レイアウト設定', 'wp-travel-itinerary-block' ) }>
					{/* ToggleControl: オン/オフ切り替えスイッチ */}
					<ToggleControl
						label={ __( 'PCで横並びにする', 'wp-travel-itinerary-block' ) }
						help={ orientation === 'horizontal' ? __( '幅の広い画面で各要素を横に並べます。', 'wp-travel-itinerary-block' ) : __( '各要素を縦に並べます。', 'wp-travel-itinerary-block' ) }
						checked={ orientation === 'horizontal' }
						onChange={ ( isChecked ) =>
							setAttributes( { orientation: isChecked ? 'horizontal' : 'vertical' } )
						}
					/>
					{/* RangeControl: スライダーで数値を入力 */}
					<RangeControl
						label={ __( '地点ブロック共通幅 (px)', 'wp-travel-itinerary-block' ) }
						value={ locationCommonWidth } // 現在の値を表示
						onChange={ ( value ) => setAttributes( { locationCommonWidth: value } ) } // 変更時に属性を更新
						min={ 50 } // 最小値
						max={ 500 } // 最大値
						step={ 10 } // 増減単位
					/>
					<RangeControl
						label={ __( '移動情報ブロック共通幅 (px, 横並び時)', 'wp-travel-itinerary-block' ) }
						value={ infoCommonWidth }
						onChange={ ( value ) => setAttributes( { infoCommonWidth: value } ) }
						min={ 30 }
						max={ 300 }
						step={ 10 }
					/>
					<RangeControl
						label={ __( '移動情報ブロック最低高さ (px, 縦並び時)', 'wp-travel-itinerary-block' ) }
						value={ infoVerticalMinHeight }
						onChange={ ( value ) => setAttributes( { infoVerticalMinHeight: value } ) }
						min={ 30 }
						max={ 300 }
						step={ 10 }
						help={__('縦に並べた時の移動情報ブロック（線）の最低限の高さを指定します。', 'wp-travel-itinerary-block')}
					/>
				</PanelBody>
				<PanelBody title={ __( '枠線設定', 'wp-travel-itinerary-block' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( '枠線を表示する', 'wp-travel-itinerary-block' ) }
						checked={ attributes.showBorders }
						onChange={ ( value ) => setAttributes( { showBorders: value } ) }
						help={__('子ブロックで個別に設定されていない場合に適用されます。', 'wp-travel-itinerary-block')}
					/>
					<RangeControl
						label={ __( 'デフォルトの枠線の幅 (px)', 'wp-travel-itinerary-block' ) }
						value={ attributes.defaultBorderWidth }
						onChange={ ( value ) => setAttributes( { defaultBorderWidth: value } ) }
						min={ 1 }
						max={ 10 }
						step={ 1 }
						help={__('子ブロックで個別に設定されていない場合に適用されます。', 'wp-travel-itinerary-block')}
					/>
				</PanelBody>
				{/*
				  色とグラデーションの設定は block.json の supports で有効化されているため、
				  WordPress コアが提供する標準のUIが自動的にここに（または別のパネルに）表示されます。
				  そのため、<PanelColorSettings> を自分で記述する必要はありません。
				*/}
			</InspectorControls>

			{/* ブロックエディタ内の実際の表示部分 */}
			{/* blockProps を展開して、クラス名やスタイルなどを適用 */}
			<div { ...blockProps }>
				{/* InnerBlocks: 子ブロックを配置・編集するためのコンポーネント */}
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS } // 挿入可能な子ブロックを制限
					template={ TEMPLATE } // 初期状態の子ブロックテンプレート
					// templateLock={ false } // false (デフォルト) なら追加・削除・移動が可能
					// orientation="vertical" // デフォルトは vertical
				/>
			</div>
		</>
	);
}