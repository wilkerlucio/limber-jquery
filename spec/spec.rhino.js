
load('./spec/lib/jspec.js')
load('vendor/jquery-1.3.2.min.js')
load('lib/core.js')

JSpec
.exec('spec/spec.core.js')
.run({ formatter: JSpec.formatters.Terminal })
.report()
