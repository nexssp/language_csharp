#r "nuget:Newtonsoft.Json,12.0.3"

using Newtonsoft.Json;
Console.InputEncoding = System.Text.Encoding.UTF8;
Console.OutputEncoding = System.Text.Encoding.UTF8;
string line;
while ((line = Console.ReadLine()) != null && line != "") {
    dynamic obj = JsonConvert.DeserializeObject(line);
obj.HelloFromCSharp = Environment.Version.ToString();
    Console.WriteLine(obj.ToString(Newtonsoft.Json.Formatting.None));
}