using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnboardingTaskOne.Models;

namespace OnboardingTaskOne.Controllers
{
    [Route("api/Customer")]
    [ApiController]
    public class CustomerController : ControllerBase
    {

        public static IList<Customer> customerList = new List<Customer>() {
                new Customer(){ Id=1, Name="Bill", Address="Albany"},
                new Customer(){ Id=2, Name="Steve", Address="CBD"},
                new Customer(){ Id=3, Name="Ram", Address="Manukau"},
                new Customer(){ Id=4, Name="Moin", Address="Bottany"}
            };


        // GET: api/Customer
        [HttpGet]
        public IEnumerable<Customer> GetCustomer()
        {
            return customerList;
        }

        // POST: api/Customer
        [HttpPost]
        public IActionResult Post([FromBody] Customer newCust)
        {
            Customer cust = new Customer() { Id = newCust.Id, Name = newCust.Name, Address = newCust.Address };
            customerList.Add(cust);
            return Ok();
        }

        // PUT: api/Customer/5
        [HttpPut("{id}")]
        public void Put([FromBody] Customer cust)
        {
            Customer updatedCust = new Customer() { Id = cust.Id, Name = cust.Name, Address = cust.Address };
            foreach(Customer c in customerList)
            {
                if(c.Id == updatedCust.Id)
                {
                    c.Name = updatedCust.Name;
                    c.Address = updatedCust.Address;
                }
            }

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete([FromBody] Customer cust)
        {
            //Delete the customer
        }
    }
}
