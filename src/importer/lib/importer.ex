defmodule HelloWorld do
  def say do
    IO.puts("Hello, World!!")
  end
end

defmodule XML do
  import SweetXml

  def list do
    IO.puts("Listing all available XML files!")
    case File.ls("/data") do
      {:ok, files} ->
        files
        |> Enum.filter(&String.ends_with?(&1, ".xml"))
        |> Enum.each(&process_file/1)
      {:error, reason} ->
        IO.puts("Error accessing /data: #{reason}")
    end
  end

  defp process_file(file_name) do
    IO.puts("Processing file: #{file_name}")
    file_path = Path.join("/data", file_name)

    file_path
    |> File.read!()
    |> parse_xml()
  end

  defp parse_xml(xml_content) do
    IO.puts("XML Content of the file: \n#{xml_content}")
    xml_content
    |> xpath(
         ~x"//item"l,
         name: ~x"./name/text()",
         description: ~x"./description/text()"
       )
    |> Enum.each(&IO.inspect/1)
  end
end

defmodule Importer.Application do
  use Application

  def start(_type, _args) do
    HelloWorld.say()
    XML.list()

    # Start a minimal supervision tree
    children = []
    opts = [strategy: :one_for_one, name: Importer.Supervisor]
    Supervisor.start_link(children, opts)
    :init.stop()
  end

end


