<?php
/**
 * Plugin Name:       Rbf Custom Blocks
 * Description:       Custom Blocks for the Ruby Bridges Theme.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       rbf-blocks
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function rbf_blocks_init() {
	require_once trailingslashit( __DIR__ ) . 'src/blocks/rbf-parent-post-title/index.php';
	register_block_type(
		trailingslashit( __DIR__ ) . 'build/blocks/rbf-parent-post-title',
		array(
			'render_callback' => 'render_block_rbf_post_title',
		)
	);

	require_once trailingslashit( __DIR__ ) . 'src/blocks/rbf-child-post-title/index.php';
	register_block_type(
		trailingslashit( __DIR__ ) . 'build/blocks/rbf-child-post-title',
		array(
			'render_callback' => 'render_block_rbf_child_post_title',
		)
	);
}

add_action( 'init', 'rbf_blocks_init' );
