using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class DCandidate
    {
        [Key]
        public int id { get; set; }
        [System.ComponentModel.DataAnnotations.Schema.Column(TypeName = "nvarchar(100)")]
        public required string fullName { get; set; }
        [System.ComponentModel.DataAnnotations.Schema.Column(TypeName = "nvarchar(15)")]
        public required string mobile { get; set; }
        [System.ComponentModel.DataAnnotations.Schema.Column(TypeName = "nvarchar(100)")]
        public required string email { get; set; }
        public int age { get; set; }
        [System.ComponentModel.DataAnnotations.Schema.Column(TypeName = "nvarchar(10)")]
        public required string bloodGroup { get; set; }
        [System.ComponentModel.DataAnnotations.Schema.Column(TypeName = "nvarchar(200)")]
        public required string address { get; set; }
    }
}
