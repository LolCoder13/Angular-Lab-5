using Lab_2.Models;
using Microsoft.EntityFrameworkCore;

namespace Lab_2.Repositorires
{
    public class GenericRepository<TEntity> where TEntity : class , new()
    {
        protected readonly AngularLabDbContext context;

        public GenericRepository(AngularLabDbContext context)
        {
            this.context = context;
        }
        public List<TEntity> GetAll() {
            return context.Set<TEntity>().ToList();
        }
        public TEntity FindById(int id) {
            var trackedEntity=context.Set<TEntity>().Find(id);
            if (trackedEntity != null) {
                context.Entry(trackedEntity).State = EntityState.Detached;
            }
            return trackedEntity;
            
        }
        public void Add(TEntity entity)
        {
            context.Set<TEntity>().Add(entity);
        }

        public void Edit(TEntity entity)
        {
            //context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            context.Set<TEntity>().Update(entity);
        }

        public bool delete(int id)
        {
            TEntity t = FindById(id);
            if (t != null)
            {
                context.Set<TEntity>().Remove(t);
                return true;
            }
            return false;
        }
        public bool CanUseId(int id)
        {
            var keyName = context.Model.FindEntityType(typeof(TEntity))
            .FindPrimaryKey().Properties.Select(x => x.Name).Single();
            if (context.Set<TEntity>().Any(e => EF.Property<object>(e, keyName).Equals(id)))
            {
                return false;
            }
            return true;
        }
    }
}
