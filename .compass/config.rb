# Compass configuration file.

# We also support plugins and frameworks, please read the docs http://docs.mixture.io/preprocessors#compass
# require 'susy' # Susy (susy.oddbird.net) is available in Mixture, just uncomment to require and use

project_path =File.expand_path("..",File.dirname(__FILE__))

http_path = "/"
css_dir = "assets/css"
sass_dir = "assets/scss"
images_dir = "assets/images"
javascripts_dir = "assets/scripts"
#svg_dir = "assets/svg"
fonts_dir = "assets/fonts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
# Over-ride with force compile to change output style with: compass compile --output-style compressed --force
output_style = :expanded

line_comments = false # if debugging (using chrome extension - set this to true)
cache = true
# relative_assets = true
color_output = false # required for Mixture

require 'sass-globbing'

# SASS core
# -----------------------------------------------------------------------------

# Chrome needs a precision of 7 to round properly
Sass::Script::Number.precision = 7

