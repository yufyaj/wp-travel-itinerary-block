/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, ToolbarGroup, ToolbarButton, RangeControl, ColorPicker, ToggleControl } from '@wordpress/components';
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
        locationName,
        textAlign = 'center', // デフォルト値
        style,
        width, // 個別幅は undefined がデフォルトでOK
    } = attributes;

	// style に個別幅とテキスト配置を設定
    const blockStyle = {
        textAlign: textAlign,
        width: width ? `${width}px` : undefined, // widthが数値なら 'px' を付けて設定
        '--show-border': attributes.useCustomBorder ? (attributes.showBorder ? 'solid' : 'none') : 'inherit', // 枠線の表示/非表示を設定
        '--border-color': attributes.useCustomBorder ? attributes.borderColor : 'inherit', // 枠線の色を設定
        '--border-width': attributes.useCustomBorder ? (attributes.borderWidth ? `${attributes.borderWidth}px` : 'inherit') : 'inherit', // 枠線の幅を設定
        '--border-style': attributes.useCustomBorder ? (attributes.showBorder ? 'solid' : 'none') : 'inherit' // 枠線のスタイルを設定
    };

    // 個別設定をリセットする関数
    const resetCustomBorder = () => {
        setAttributes({
            useCustomBorder: false,
            showBorder: undefined,
            borderColor: undefined,
            borderWidth: undefined
        });
    };

    // useBlockProps が style 属性 (色・グラデーション) と blockStyle をマージして適用
    const blockProps = useBlockProps( { 
        style: blockStyle,
        className: 'wp-block-wp-travel-itinerary-location'
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
				{/* 色とグラデーションの設定は標準UI */}
				<PanelBody title={ __( '幅設定', 'wp-travel-itinerary-block' ) } initialOpen={ false }>
					<RangeControl
						label={ __( '個別幅 (px)', 'wp-travel-itinerary-block' ) }
						value={ width === undefined ? null : width }
						onChange={ ( value ) => setAttributes( { width: value === null ? undefined : value } ) }
						min={ 50 }
						max={ 500 }
						step={ 10 }
						allowReset={ true }
						resetFallbackValue={ undefined }
						help={__('未設定の場合は共通幅が適用されます。', 'wp-travel-itinerary-block')}
					/>
				</PanelBody>
				<PanelBody title={ __( '枠線設定', 'wp-travel-itinerary-block' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( '個別の枠線設定を使用する', 'wp-travel-itinerary-block' ) }
						checked={ attributes.useCustomBorder }
						onChange={ ( value ) => {
                            if (!value) {
                                resetCustomBorder();
                            } else {
                                setAttributes({ 
                                    useCustomBorder: true,
                                    showBorder: true // 個別設定を有効にする時はデフォルトで表示
                                });
                            }
                        }}
						help={__('オフにすると親ブロックの設定が適用されます。', 'wp-travel-itinerary-block')}
					/>
					
					{attributes.useCustomBorder && (
						<>
							<ToggleControl
								label={ __( '枠線を表示する', 'wp-travel-itinerary-block' ) }
								checked={ attributes.showBorder }
								onChange={ ( value ) => setAttributes( { showBorder: value } ) }
								help={__('枠線の表示/非表示を設定します。', 'wp-travel-itinerary-block')}
							/>
							<ColorPicker
								color={ attributes.borderColor }
								onChange={ ( value ) => setAttributes( { borderColor: value || undefined } ) }
								enableAlpha={ false }
								label={ __( '枠線の色', 'wp-travel-itinerary-block' ) }
								help={__('枠線の色を設定します。', 'wp-travel-itinerary-block')}
							/>
							<RangeControl
								label={ __( '枠線の幅 (px)', 'wp-travel-itinerary-block' ) }
								value={ attributes.borderWidth === undefined ? null : attributes.borderWidth }
								onChange={ ( value ) => setAttributes( { borderWidth: value === null ? undefined : value } ) }
								min={ 1 }
								max={ 10 }
								step={ 1 }
								allowReset={ true }
								resetFallbackValue={ undefined }
								help={__('枠線の幅を設定します。', 'wp-travel-itinerary-block')}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<RichText
					tagName="div"
					className="location-name"
					value={ locationName }
					onChange={ ( newName ) => setAttributes( { locationName: newName } ) }
					placeholder={ __( '地点名を入力...', 'wp-travel-itinerary-block' ) }
					allowedFormats={ [] }
				/>
			</div>
		</>
	);
}