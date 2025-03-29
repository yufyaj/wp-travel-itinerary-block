/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function.
 */
export default function save( { attributes } ) {
	const { infoText, textAlign, style } = attributes;

	// CSSカスタムプロパティを設定
	const blockProps = useBlockProps.save( {
        className: 'travel-info-block',
		style: {
			textAlign: textAlign
		}
    } );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="div"
				className="info-text-content"
				value={ infoText }
			/>
		</div>
	);
}