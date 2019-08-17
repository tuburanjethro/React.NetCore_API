using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DBPractice.Models
{
    public class Store
    {
        [Key]
        public int Id { get; set; }

        [DataType(DataType.Text)]
        [Required(ErrorMessage = "Please enter a name (Up to 50 characters)"), MaxLength(50)]
        [Display(Name = "Customer Name")]
        public string Name { get; set; }

        [DataType(DataType.Text)]
        [Required(ErrorMessage = "Please enter an address (Up to 100 characters)"), MaxLength(100)]
        public string Address { get; set; }

        public IList<Sale> ProductSold { get; set; }
    }
}
