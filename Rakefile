desc "Compile Javascript files to a single file"
task :build do
  files = [
    "core",
    "observable",
    "ui/ui",
    "ui/generic_dragger",
    "ui/draggable",
    "ui/resizable"
  ]
  
  base_path = File.join(File.dirname(__FILE__), %w{lib})
  output = ""
  
  puts "Reading files..."
  
  files.each do |file|
    path = File.join(base_path, file) + ".js";
    
    script = File.read(path)
    lines = script.split("\n")
    output += lines[18..-1].join("\n") + "\n\n"
  end
  
  File.open("dist/limber-jquery.js", "w") do |file|
    file << output
  end
  
  puts "Build complete!"
end
