using Newtonsoft.Json;

namespace TaskSharpHTTP.Models
{
    public class TaskItem
    {
        [JsonProperty("id")]
        public int Id {get;set;}

        [JsonProperty("title")]
        public string Title {get;set;}

        [JsonProperty("description")]
        public string Description {get;set;}

        [JsonProperty("priority")]
        public bool Priority {get;set;}
    }
}