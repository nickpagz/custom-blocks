/**
 * WordPress dependencies
 */
//import { title as icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import './style.scss';


registerBlockType( 'rbf-blocks/rbf-child-post-title', {
    /**
     * @see ./edit.js
     */
    edit: Edit,
    save({attributes, className}) {
        //gutenberg will save attributes we can use in server-side callback
        return null;
    },
} );