/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function.
 */
export default function save( { attributes } ) {
	const {
        orientation = 'vertical',
        style,
        locationCommonWidth = 180,
        infoCommonWidth = 100,
		infoVerticalMinHeight = 60,
        infoBorderColor = '#ccc',
        infoBorderWidth = 1,
        showBorders = false,
        defaultBorderColor = '#ccc',
        defaultBorderWidth = 1
    } = attributes;

	const blockStyle = {
		'--location-common-width': locationCommonWidth ? `${locationCommonWidth}px` : undefined,
		'--info-common-width': infoCommonWidth ? `${infoCommonWidth}px` : undefined,
		'--info-vertical-min-height': infoVerticalMinHeight ? `${infoVerticalMinHeight}px` : undefined,
        '--info-border-color': infoBorderColor,
        '--info-border-width': infoBorderWidth ? `${infoBorderWidth}px` : undefined,
        '--show-borders': showBorders ? '1' : '0',
        '--border-color': defaultBorderColor,
        '--border-width': defaultBorderWidth ? `${defaultBorderWidth}px` : undefined,
        '--border-style': showBorders ? 'solid' : 'none'
	};

	const blockProps = useBlockProps.save( {
		className: `travel-itinerary-container orientation-${ orientation }`,
		style: blockStyle
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}