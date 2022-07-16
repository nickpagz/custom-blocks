/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	AlignmentControl,
	BlockControls,
	InspectorControls,
	useBlockProps,
	PlainText,
} from '@wordpress/block-editor';
import { ToggleControl, TextControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEntityProp } from '@wordpress/core-data';
import HeadingLevelDropdown from '@wordpress/block-library';

export default function RbfPostTitleEdit( {
	attributes: { level, textAlign, isLink, rel, linkTarget },
	setAttributes,
	context: { postType, postId, queryId },
} ) {
	const TagName = 0 === level ? 'p' : 'h' + level;
	const isDescendentOfQueryLoop = Number.isFinite( queryId );
	const [ rawTitle = '', setTitle, fullTitle ] = useEntityProp(
		'postType',
		postType,
		'title',
		postId
	);
	const [ link ] = useEntityProp( 'postType', postType, 'link', postId );
	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );

	let titleElement = (
		<TagName { ...blockProps }>{ __( 'Post Title' ) }</TagName>
	);

	if ( postType && postId ) {
		titleElement =
			! isDescendentOfQueryLoop ? (
				<PlainText
					tagName={ TagName }
					placeholder={ __( 'No Title' ) }
					value={ rawTitle }
					onChange={ setTitle }
					__experimentalVersion={ 2 }
					{ ...blockProps }
				/>
			) : (
				<TagName
					{ ...blockProps }
					dangerouslySetInnerHTML={ { __html: fullTitle?.rendered } }
				/>
			);
	}

	if ( isLink && postType && postId ) {
		titleElement =
			! isDescendentOfQueryLoop ? (
				<TagName { ...blockProps }>
					<PlainText
						tagName="a"
						href={ link }
						target={ linkTarget }
						rel={ rel }
						placeholder={
							! rawTitle.length ? __( 'No Title' ) : null
						}
						value={ rawTitle }
						onChange={ setTitle }
						__experimentalVersion={ 2 }
					/>
				</TagName>
			) : (
				<TagName { ...blockProps }>
					<a
						href={ link }
						target={ linkTarget }
						rel={ rel }
						onClick={ ( event ) => event.preventDefault() }
						dangerouslySetInnerHTML={ {
							__html: fullTitle?.rendered,
						} }
					/>
				</TagName>
			);
	}

	return (
		<>
			{ titleElement }
		</>
	);
}
