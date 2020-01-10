#r "nuget:Newtonsoft.Json,12.0.3"

using Newtonsoft.Json;
string line;
while ((line = Console.ReadLine()) != null && line != "") {
    dynamic obj = JsonConvert.DeserializeObject(line);
    obj.test = "test";
    Console.WriteLine(obj.ToString(Newtonsoft.Json.Formatting.None));
}