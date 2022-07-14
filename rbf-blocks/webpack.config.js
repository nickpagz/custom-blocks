/**
 * `@wordpress/scripts` multi-config multi-block Webpack configuration.
 *
 * @see https://wordpress.stackexchange.com/questions/390282
 */

// Native Depedencies.
const path = require( 'path' );

const default_config_path = require.resolve(
	'@wordpress/scripts/config/webpack.config.js'
);

/**
 * Retrieves a new instance of `@wordpress/scripts`' default webpack configuration object.
 *
 * @return WebpackOptions
 */
const getBaseConfig = () => {
	// If the default config's already been imported, clear the module from the cache so that Node
	// will interpret the module file again and provide a brand new object.
	if ( require.cache[ default_config_path ] )
		delete require.cache[ default_config_path ];

	// Import a new instance of the default configuration object.
	return require( default_config_path );
};

/**
 * @callback buildConfig~callback
 * @param {WebpackOptions} config An instance of `@wordpress/scripts`' default configuration object.
 * @return WebpackOptions The modified or replaced configuration object.
 */

/**
 * Returns the result of executing a callback function provided with a new default configuration
 * instance.
 *
 * @param {buildConfig~callback} callback
 * @return WebpackOptions The modified or replaced configuration object.
 */
const buildConfig = ( callback ) => callback( getBaseConfig() );

/**
 * Extends `@wordpress/scripts`'s default webpack config to build block sources from a common
 * `./src/blocks` directory and output built assets to a common `./build/blocks` directory.
 *
 * @param {string} block_name
 * @return WebpackOptions A configuration object for this block.
 */
const buildBlockConfig = ( block_name ) =>
	buildConfig( ( config ) => ( {
		// Copy all properties from the base config into the new config, then override some.
		...config,
		// Override the block's "index" entry point to be `./src/blocks/{block name}/index.js`.
		entry: {
			index: path.resolve(
				process.cwd(),
				'src',
				'blocks',
				block_name,
				'index.js'
			),
		},
		// This block's built assets should be output to `./build/blocks/{block name}/`.
		output: {
			...config.output,
			path: path.resolve( config.output.path, 'blocks', block_name ),
		},
	} ) );

module.exports = [
	buildBlockConfig( 'rbf-parent-post-title' ),
	buildBlockConfig( 'rbf-child-post-title' ),
];
