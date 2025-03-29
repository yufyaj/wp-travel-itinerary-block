/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, PanelColorSettings, BlockControls } from '@wordpress/block-editor';
import { PanelBody, ToolbarGroup, ToolbarButton } from '@wordpress/components'; // GradientPicker は不要
import { alignLeft, alignCenter, alignRight } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './style.scss';

// 配置オプション
const alignmentOptions = [
    { value: 'left', icon: alignLeft, label: __('左寄せ', 'wp-travel-itinerary-block') },
    { value: 'center', icon: alignCenter, label: __('中央寄せ', 'wp-travel-itinerary-block') },
    { value: 'right', icon: alignRight, label: __('右寄せ', 'wp-travel-itinerary-block') },
];

// WordPress のデフォルトカラーパレットとグラデーションを取得
let DEFAULT_COLORS = [];
let DEFAULT_GRADIENTS = [];
wp.data.subscribe(() => { // 設定が読み込まれたら取得
	const settings = wp.data.select( 'core/block-editor' )?.getSettings();
	if (settings) {
		DEFAULT_COLORS = settings.colors || [];
		DEFAULT_GRADIENTS = settings.gradients || [];
	}
});


/**
 * The edit function describes the structure of your block in the editor.
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
        infoText,
        textAlign = 'center', // デフォルト値
        style,
    } = attributes;

	// CSSカスタムプロパティを設定（値が undefined なら設定しない）
    const blockStyle = {
        textAlign: textAlign,
    };

	// useBlockProps が style 属性 (文字色) と blockStyle をマージして適用
    const blockProps = useBlockProps( {
		className: 'travel-info-block-editor',
		style: blockStyle
	} );

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					{ alignmentOptions.map( ( { value, icon, label } ) => (
						<ToolbarButton
							key={ value }
							icon={ icon }
							label={ label }
							onClick={ () => setAttributes( { textAlign: value } ) }
							isPressed={ textAlign === value }
						/>
					) ) }
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				{/* 文字色の設定は標準UI */}
			</InspectorControls>

			<div { ...blockProps }>
				<RichText
					tagName="div"
					className="info-text-content"
					value={ infoText }
					onChange={ ( newText ) => setAttributes( { infoText: newText } ) }
					placeholder={ __( '例: 新幹線 のぞみ - 約3時間10分', 'wp-travel-itinerary-block' ) }
					allowedFormats={ [] }
	                multiline="p"
				/>
			</div>
		</>
	);
}