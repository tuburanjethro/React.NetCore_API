using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnboardingTaskOne.Models;

namespace OnboardingTaskOne.Controllers
{
    [Route("api/Store")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        public static IList<Store> storeList = new List<Store>() {
                new Store(){ Id=1, Name="Pak n Save", Address="Albany"},
                new Store(){ Id=2, Name="Countdown", Address="CBD"},
                new Store(){ Id=3, Name="Four Square", Address="Manukau"},
                new Store(){ Id=4, Name="New World", Address="Bottany"}
            };


        // GET: api/Store
        [HttpGet]
        public IEnumerable<Store> GetStore()
        {
            return storeList;
        }

        // POST: api/Store
        [HttpPost]
        public IActionResult Post([FromBody] Store newStore)
        {
            Store store = new Store() { Id = newStore.Id, Name = newStore.Name, Address = newStore.Address };
            storeList.Add(store);
            return Ok();
        }

        // PUT: api/Store/5
        [HttpPut("{id}")]
        public void Put([FromBody] Store store)
        {
            Customer updatedStore = new Customer() { Id = store.Id, Name = store.Name, Address = store.Address };
            foreach (Store c in storeList)
            {
                if (c.Id == updatedStore.Id)
                {
                    c.Name = updatedStore.Name;
                    c.Address = updatedStore.Address;
                }
            }

        }

        // DELETE: api/Store/5
        [HttpDelete("{id}")]
        public void Delete([FromBody] Store store)
        {
            //Delete the customer
        }
    }
}
