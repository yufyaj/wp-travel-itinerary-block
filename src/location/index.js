// 変更なし
/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './style.scss';

/**
 * Register the block type.
 */
registerBlockType( metadata.name, {
	...metadata,
	edit: Edit,
	save,
} );