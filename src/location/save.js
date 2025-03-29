/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function.
 */
export default function save( { attributes } ) {
	// ★ width を取得
	const { locationName, textAlign, style, width, useCustomBorder, showBorder, borderColor, borderWidth } = attributes;

	// ★ style に個別幅を設定 (設定されていれば)
    const blockStyle = {
        textAlign: textAlign,
        width: width ? `${width}px` : undefined, // widthが数値なら 'px' を付けて設定
        '--show-border': useCustomBorder ? (showBorder ? 'solid' : 'none') : 'inherit', // 枠線の表示/非表示を設定
        '--border-color': useCustomBorder ? (borderColor || 'inherit') : 'inherit', // 枠線の色を設定
        '--border-width': useCustomBorder ? (borderWidth ? `${borderWidth}px` : 'inherit') : 'inherit', // 枠線の幅を設定
        '--border-style': useCustomBorder ? (showBorder ? 'solid' : 'none') : 'inherit' // 枠線のスタイルを設定
    };

	const blockProps = useBlockProps.save( {
        className: 'travel-location-block',
        style: blockStyle,
    } );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="div"
				className="location-name"
				value={ locationName }
			/>
		</div>
	);
}