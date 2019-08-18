using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DBPractice.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [DataType(DataType.Text)]
        [Required(ErrorMessage = "Please enter a name (Up to 50 characters)"), MaxLength(50)]
        [Display(Name = "Customer Name")]
        public string Name { get; set; }

        [DataType(DataType.Currency)]
        [Required(ErrorMessage = "Please enter an price")]
        public decimal Price { get; set; }

        public IList<Sale> ProductSold { get; set; }
    }
}
