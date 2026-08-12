import useAsync from '../hooks/useAsync';
import { productsApi } from '../api/products';
import ArchFrame from '../components/ArchFrame';
import { Loading, EmptyState, Notice } from '../components/UIState';
import { IconBag } from '../components/Icons';
import './ListPage.css';

const TONES = ['sage', 'clay', 'ink'];

const Products = () => {
  const { data: products, loading, error } = useAsync(
    () => productsApi.getAll(),
    []
  );

  return (
    <section className="section list-page">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Take the ritual home</span>
          <h1>Products</h1>
          <p className="lede" style={{ margin: '0 auto' }}>
            The same formulas we use in the studio, carried by our front desk
            so you can keep the routine going between visits.
          </p>
        </div>

        {error && (
          <Notice type="error">
            Couldn't load products from the studio system: {error.message}
          </Notice>
        )}

        {loading && <Loading label="Stocking the shelf…" />}

        {!loading && !error && (!products || products.length === 0) && (
          <EmptyState
            title="No products published yet"
            hint="Once the studio adds retail products, they'll appear here automatically."
          />
        )}

        {!loading && products && products.length > 0 && (
          <div className="entity-grid">
            {products.map((p, i) => {
              const low =
                typeof p.quantityInStock === 'number' &&
                typeof p.lowStockThreshold === 'number' &&
                p.quantityInStock <= p.lowStockThreshold;
              return (
                <div className="entity-card" key={p.productID ?? i}>
                  <ArchFrame
                    tone={TONES[i % TONES.length]}
                    size="sm"
                    icon={<IconBag />}
                  />
                  <div className="entity-card__body">
                    <div className="entity-card__row">
                      <h3>{p.productName}</h3>
                      {typeof p.price === 'number' && (
                        <span className="tag">R{p.price}</span>
                      )}
                    </div>
                    {p.category && (
                      <span className="entity-card__meta">{p.category}</span>
                    )}
                    <p>{p.description}</p>
                    {p.supplier && (
                      <span className="entity-card__meta" style={{ color: 'var(--color-ink-soft)' }}>
                        Supplied by {p.supplier}
                      </span>
                    )}
                    {typeof p.quantityInStock === 'number' && (
                      <span className={`entity-card__stock ${low ? 'is-low' : ''}`}>
                        {p.quantityInStock > 0
                          ? `${p.quantityInStock} ${p.unitOfMeasure || 'in stock'}${low ? ' — low stock' : ''}`
                          : 'Out of stock'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
