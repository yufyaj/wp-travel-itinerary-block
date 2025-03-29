<?php
/**
 * Plugin Name:       WP Travel Itinerary Block
 * Plugin URI:        (あなたのプラグインのURL、任意)
 * Description:       駅などの地点と移動情報を線で結んで表示するカスタムブロックプラグイン。
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.2
 * Author:            (あなたの名前)
 * Author URI:        (あなたのウェブサイトURL、任意)
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-travel-itinerary-block
 *
 * @package           wp-travel-itinerary-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function wp_travel_itinerary_block_init() {
	// Register Parent Block (wp-travel-itinerary/parent)
	register_block_type( __DIR__ . '/build' );

	// Register Child Block (wp-travel-itinerary/location)
	register_block_type( __DIR__ . '/build/location' );

	// Register Child Block (wp-travel-itinerary/info)
	register_block_type( __DIR__ . '/build/info' );
}
add_action( 'init', 'wp_travel_itinerary_block_init' );