<?php
/**
 * Server-side rendering of the `core/post-title` block.
 *
 * @package WordPress
 */

/**
 * Renders the `core/post-title` block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 *
 * @return string Returns the filtered post title for the current post wrapped inside "h1" tags.
 */
function render_block_rbf_child_post_title( $attributes, $content, $block ) {
	if ( ! isset( $block->context['postId'] ) ) {
		return '';
	}

	$post_ID   = $block->context['postId'];
	$parent_id = wp_get_post_parent_id();

	if ( 0 !== $parent_id ) {
		$title = get_the_title();
	} else {
		$title = '';
	}

	if ( ! $title ) {
		return '';
	}

	$tag_name         = 'h2';
	$align_class_name = empty( $attributes['textAlign'] ) ? '' : "has-text-align-{$attributes['textAlign']}";

	if ( isset( $attributes['level'] ) ) {
		$tag_name = 0 === $attributes['level'] ? 'p' : 'h' . $attributes['level'];
	}

	if ( isset( $attributes['isLink'] ) && $attributes['isLink'] ) {
		$title = sprintf( '<a href="%1$s" target="%2$s" rel="%3$s">%4$s</a>', get_the_permalink( $post_ID ), esc_attr( $attributes['linkTarget'] ), esc_attr( $attributes['rel'] ), $title );
	}
	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $align_class_name ) );

	return sprintf(
		'<%1$s %2$s>%3$s</%1$s>',
		$tag_name,
		$wrapper_attributes,
		$title
	);
}
