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
import './style.scss'; // Import common styles
import './editor.scss'; // Import editor-only styles

/**
 * Register the block type.
 * Notice we are assigning the metadata to the block configuration object.
 */
registerBlockType( metadata.name, {
	...metadata, // Spread the block.json metadata
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save, // shorthand for save: save
} );